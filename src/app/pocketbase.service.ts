import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

/**
 * The one PocketBase client for the whole app. Inject it wherever you talk to the
 * backend, e.g. `inject(PocketBaseService).collection('todos')`.
 *
 * Requests go to `/api` on the site's own address: nginx forwards them to PocketBase
 * in production, and `proxy.conf.json` does the same for `ng serve`.
 */
@Injectable({ providedIn: 'root' })
export class PocketBaseService extends PocketBase {
  constructor() {
    super('/');
  }
}
