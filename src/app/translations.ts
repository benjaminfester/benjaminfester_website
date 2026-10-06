export type Lang = 'en' | 'da';

const en = {
  language: 'Language',
  titles: {
    timer: 'Timer',
    todo: 'To do',
    groceries: 'Groceries',
  },
  nav: {
    home: 'Home',
    timer: 'Timer',
    todo: 'To do',
    groceries: 'Groceries',
  },
  home: {
    photoAlt: 'Portrait of Benjamin Fester',
    role: 'Software Engineer',
    location: 'Copenhagen, Denmark',
    education: 'DTU alumnus',
    position: 'Current position',
    // "At PPCD I build greenStruct." – the two names are links, so the sentence is split around them
    atCompany: 'At',
    iBuild: 'I build',
    product:
      'A tool that helps construction engineers design concrete foundations – ' +
      'slabs, strip and pad foundations – with as little material as possible.',
    impact:
      'Less concrete means lower cost and a smaller climate footprint – ' +
      'without compromising on safety.',
    skillsTitle: 'Key skills',
    skills: [
      'Software architecture',
      'Full-stack development',
      'Optimization & numerical methods',
      'Cloud & CI/CD',
      'MySQL',
      'Product development',
    ],
    hobbiesTitle: 'Outside of work',
    hobbies: ['Muay Thai', 'Running', 'Skateboarding', 'World of Warcraft'],
    github: 'See my projects on GitHub',
    linkedin: 'Connect on LinkedIn',
  },
  timer: {
    timeLeft: (time: string) => `${time} left`,
    timesUp: "Time's up!",
    endsAt: (time: string) => `Ends at ${time}`,
    minus: 'One minute less',
    plus: 'One minute more',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    fabStart: 'Start timer',
    fabPause: 'Pause timer',
  },
  todo: {
    title: 'To do',
    placeholder: 'Add something…',
    newItem: 'New to-do',
    add: 'Add',
    empty: 'Nothing to do 🎉',
    remove: 'Delete',
    done: (n: number) => `Done (${n})`,
    clear: 'Clear',
    fab: 'Add to-do',
  },
  groceries: {
    title: 'Groceries',
    placeholder: 'Milk, eggs, bread…',
    newItem: 'New grocery item',
    add: 'Add',
    recent: 'Recently added',
    forget: (name: string) => `Forget ${name}`,
    empty: 'Nothing to buy 🛒',
    remove: (name: string) => `Remove ${name}`,
    bought: (n: number) => `In the basket (${n})`,
    clear: 'Clear',
    fab: 'Add grocery item',
  },
};

export type Translations = typeof en;

const da: Translations = {
  language: 'Sprog',
  titles: {
    timer: 'Timer',
    todo: 'Opgaver',
    groceries: 'Indkøb',
  },
  nav: {
    home: 'Hjem',
    timer: 'Timer',
    todo: 'Opgaver',
    groceries: 'Indkøb',
  },
  home: {
    photoAlt: 'Portræt af Benjamin Fester',
    role: 'Softwareingeniør',
    location: 'København, Danmark',
    education: 'Uddannet fra DTU',
    position: 'Nuværende stilling',
    atCompany: 'Hos',
    iBuild: 'bygger jeg',
    product:
      'Et værktøj, der hjælper konstruktionsingeniører med at dimensionere betonfundamenter – ' +
      'terrændæk, stribe- og punktfundamenter – med så lidt materiale som muligt.',
    impact:
      'Mindre beton betyder lavere omkostninger og et mindre klimaaftryk – ' +
      'uden at gå på kompromis med sikkerheden.',
    skillsTitle: 'Nøglekompetencer',
    skills: [
      'Softwarearkitektur',
      'Full-stack-udvikling',
      'Optimering & numeriske metoder',
      'Cloud & CI/CD',
      'MySQL',
      'Produktudvikling',
    ],
    hobbiesTitle: 'Uden for arbejdet',
    hobbies: ['Muay Thai', 'Løb', 'Skateboarding', 'World of Warcraft'],
    github: 'Se mine projekter på GitHub',
    linkedin: 'Forbind med mig på LinkedIn',
  },
  timer: {
    timeLeft: (time: string) => `${time} tilbage`,
    timesUp: 'Tiden er gået!',
    endsAt: (time: string) => `Slutter kl. ${time}`,
    minus: 'Et minut mindre',
    plus: 'Et minut mere',
    start: 'Start',
    pause: 'Pause',
    resume: 'Fortsæt',
    reset: 'Nulstil',
    fabStart: 'Start timer',
    fabPause: 'Sæt timer på pause',
  },
  todo: {
    title: 'Opgaver',
    placeholder: 'Tilføj noget…',
    newItem: 'Ny opgave',
    add: 'Tilføj',
    empty: 'Intet at lave 🎉',
    remove: 'Slet',
    done: (n: number) => `Færdige (${n})`,
    clear: 'Ryd',
    fab: 'Tilføj opgave',
  },
  groceries: {
    title: 'Indkøb',
    placeholder: 'Mælk, æg, brød…',
    newItem: 'Ny vare',
    add: 'Tilføj',
    recent: 'Senest tilføjet',
    forget: (name: string) => `Glem ${name}`,
    empty: 'Intet at købe 🛒',
    remove: (name: string) => `Fjern ${name}`,
    bought: (n: number) => `I kurven (${n})`,
    clear: 'Ryd',
    fab: 'Tilføj vare',
  },
};

export const translations: Record<Lang, Translations> = { en, da };
