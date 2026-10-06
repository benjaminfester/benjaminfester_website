import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FabService } from '../fab.service';

type Status = 'idle' | 'running' | 'paused' | 'done';

interface SavedState {
  status: Status;
  durationMs: number;
  endAt: number;
  pausedRemainingMs: number;
}

const STORAGE_KEY = 'timer-state';
const MAX_MINUTES = 60;
const CX = 100;
const CY = 100;
const DISK_R = 78;

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  readonly presets = [5, 10, 15, 20, 30, 45];

  readonly ticks = Array.from({ length: 60 }, (_, i) => {
    const major = i % 5 === 0;
    const inner = this.point(i * 6, major ? 84 : 88);
    const outer = this.point(i * 6, 92);
    return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y, major };
  });

  readonly labels = Array.from({ length: 12 }, (_, i) => ({
    text: String(i * 5),
    ...this.point(i * 30, 70),
  }));

  minutes = signal(20);
  status = signal<Status>('idle');
  remainingMs = signal(20 * 60_000);

  private endAt = 0;
  private frame = 0;
  private wakeLock: { release(): Promise<void> } | null = null;
  private audio: AudioContext | null = null;

  /** Red disk, measured counter-clockwise from 12 o'clock like a real Time Timer. */
  readonly diskPath = computed(() => {
    const deg = Math.min(360, (this.remainingMs() / 60_000) * 6);
    if (deg <= 0) return '';
    if (deg >= 359.99) {
      return `M ${CX} ${CY - DISK_R} A ${DISK_R} ${DISK_R} 0 1 0 ${CX} ${CY + DISK_R} A ${DISK_R} ${DISK_R} 0 1 0 ${CX} ${CY - DISK_R} Z`;
    }
    const end = this.point(deg, DISK_R);
    const largeArc = deg > 180 ? 1 : 0;
    return `M ${CX} ${CY} L ${CX} ${CY - DISK_R} A ${DISK_R} ${DISK_R} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
  });

  readonly timeText = computed(() => {
    const total = Math.ceil(this.remainingMs() / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  });

  readonly endsAtText = computed(() => {
    if (this.status() !== 'running') return '';
    const d = new Date(Date.now() + this.remainingMs());
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  constructor() {
    inject(FabService).register(() =>
      this.status() === 'running'
        ? { icon: 'pause', label: 'Pause timer', run: () => this.pause() }
        : { icon: 'play', label: 'Start timer', run: () => this.start() },
    );
  }

  private readonly onVisibility = () => {
    if (document.visibilityState === 'visible' && this.status() === 'running') {
      this.requestWakeLock();
    }
  };

  ngOnInit(): void {
    this.restore();
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.releaseWakeLock();
    this.audio?.close();
  }

  setMinutes(value: number | string): void {
    const n = Math.round(Number(value));
    const clamped = Number.isFinite(n) ? Math.min(MAX_MINUTES, Math.max(1, n)) : 1;
    this.minutes.set(clamped);
    if (this.status() === 'idle' || this.status() === 'done') {
      this.status.set('idle');
      this.remainingMs.set(clamped * 60_000);
      this.save();
    }
  }

  start(): void {
    this.unlockAudio();
    if (this.status() === 'idle' || this.status() === 'done') {
      this.remainingMs.set(this.minutes() * 60_000);
    }
    this.endAt = Date.now() + this.remainingMs();
    this.status.set('running');
    this.requestWakeLock();
    this.save();
    this.loop();
  }

  pause(): void {
    cancelAnimationFrame(this.frame);
    this.remainingMs.set(Math.max(0, this.endAt - Date.now()));
    this.status.set('paused');
    this.releaseWakeLock();
    this.save();
  }

  reset(): void {
    cancelAnimationFrame(this.frame);
    this.status.set('idle');
    this.remainingMs.set(this.minutes() * 60_000);
    this.releaseWakeLock();
    this.save();
  }

  private loop = (): void => {
    const left = Math.max(0, this.endAt - Date.now());
    this.remainingMs.set(left);
    if (left === 0) {
      this.finish();
      return;
    }
    this.frame = requestAnimationFrame(this.loop);
  };

  private finish(): void {
    this.status.set('done');
    this.releaseWakeLock();
    this.save();
    this.chime();
  }

  /** Point on a circle, `deg` degrees counter-clockwise from 12 o'clock. */
  private point(deg: number, r: number): { x: number; y: number } {
    const rad = (deg * Math.PI) / 180;
    return {
      x: +(CX - r * Math.sin(rad)).toFixed(3),
      y: +(CY - r * Math.cos(rad)).toFixed(3),
    };
  }

  private save(): void {
    const state: SavedState = {
      status: this.status(),
      durationMs: this.minutes() * 60_000,
      endAt: this.endAt,
      pausedRemainingMs: this.remainingMs(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  /** Survive a page reload mid-countdown. */
  private restore(): void {
    let state: SavedState | null = null;
    try {
      state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    } catch {}
    if (!state) return;

    this.minutes.set(Math.round(state.durationMs / 60_000) || 20);
    if (state.status === 'running' && state.endAt > Date.now()) {
      this.endAt = state.endAt;
      this.status.set('running');
      this.requestWakeLock();
      this.loop();
    } else if (state.status === 'paused') {
      this.status.set('paused');
      this.remainingMs.set(state.pausedRemainingMs);
    } else {
      this.remainingMs.set(this.minutes() * 60_000);
    }
  }

  private async requestWakeLock(): Promise<void> {
    try {
      const nav = navigator as Navigator & {
        wakeLock?: { request(type: 'screen'): Promise<{ release(): Promise<void> }> };
      };
      if (nav.wakeLock && !this.wakeLock) {
        this.wakeLock = await nav.wakeLock.request('screen');
        (this.wakeLock as unknown as EventTarget).addEventListener?.('release', () => {
          this.wakeLock = null;
        });
      }
    } catch {}
  }

  private releaseWakeLock(): void {
    this.wakeLock?.release().catch(() => {});
    this.wakeLock = null;
  }

  /** Browsers only allow audio after a user gesture, so create it on Start. */
  private unlockAudio(): void {
    try {
      this.audio ??= new AudioContext();
      this.audio.resume();
    } catch {}
  }

  private chime(): void {
    const ctx = this.audio;
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const t = ctx.currentTime + i * 0.25;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1.3);
    });
  }
}
