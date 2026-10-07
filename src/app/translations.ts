export type Lang = 'en' | 'da';

/** One heading with its paragraphs, used by the privacy policy and terms of service. */
export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

const CONTACT = 'benfesterh@gmail.com';

const en = {
  language: 'Language',
  titles: {
    timer: 'Timer',
    todo: 'To do',
    groceries: 'Groceries',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
    login: 'Sign in',
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
  auth: {
    title: 'Sign in',
    intro: 'Sign in to use the timer, to-do list and grocery list. Your lists follow you to all your devices.',
    google: 'Sign in with Google',
    waiting: 'Waiting for Google…',
    failed: 'Sign-in failed or was cancelled. Please try again.',
    // "By signing in you accept the terms of service and the privacy policy." – the two names are links
    acceptPrefix: 'By signing in you accept the',
    termsLink: 'terms of service',
    and: 'and the',
    privacyLink: 'privacy policy',
    signIn: 'Sign in',
    account: 'Account',
    signOut: 'Sign out',
  },
  legal: {
    updated: 'Last updated: 7 October 2026',
    privacy: [
      {
        heading: 'Who I am',
        paragraphs: [
          'benjaminfester.dk and its apps (timer, to-do and groceries) are run by me, Benjamin Fester, ' +
            'a private person in Copenhagen, Denmark. I am the data controller for the personal data described here.',
          `Questions or requests: ${CONTACT}`,
        ],
      },
      {
        heading: 'What I collect',
        paragraphs: [
          'When you sign in with Google, I receive your name, email address and profile picture from Google. ' +
            'I do not get your Google password and I do not ask for access to anything else in your Google account.',
          'I store what you enter in the apps – your to-dos and grocery items – so they are the same on all your devices.',
          'Your language choice and timer are only saved in your own browser (local storage) and are never sent to me.',
        ],
      },
      {
        heading: 'Why I use it',
        paragraphs: [
          'Your data is only used to sign you in and to show you your own lists. ' +
            'The legal basis is that it is needed to provide the service you asked for (GDPR article 6(1)(b)).',
          'I do not sell your data, show ads, use analytics or tracking cookies, or use your data to train AI models.',
        ],
      },
      {
        heading: 'Google user data',
        paragraphs: [
          'The use of information received from Google APIs follows the Google API Services User Data Policy, ' +
            'including the Limited Use requirements. Your Google data is only used to sign you in and is never ' +
            'shared with or transferred to anyone else.',
        ],
      },
      {
        heading: 'Where it is stored and who sees it',
        paragraphs: [
          'Your account and lists are stored in a database on a server I rent and run myself. Only I have access to it.',
          'Google handles the sign-in, and icons on the site are loaded from Cloudflare (cdnjs), ' +
            'which means your browser sends your IP address to them. Nobody else receives your data.',
        ],
      },
      {
        heading: 'How long I keep it',
        paragraphs: [
          'I keep your account and lists for as long as you have an account. Items you delete are deleted right away. ' +
            'If you ask me to delete your account, I delete it and all its data within 30 days.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can ask to see, correct, export or delete your data, or object to how it is used. ' +
            `Just write to ${CONTACT}. You can also remove this site's access in your Google account settings at any time.`,
          'If you think I handle your data wrongly, you can complain to the Danish Data Protection Agency (Datatilsynet, datatilsynet.dk).',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'If this policy changes, I will update it here and change the date at the top. ' +
            'For bigger changes I will tell you when you sign in.',
        ],
      },
    ] as LegalSection[],
    terms: [
      {
        heading: 'The service',
        paragraphs: [
          'benjaminfester.dk offers small personal apps – a timer, a to-do list and a grocery list – ' +
            'run by me, Benjamin Fester, as a hobby project. By signing in or using the apps you agree to these terms.',
        ],
      },
      {
        heading: 'Your account',
        paragraphs: [
          'You sign in with your Google account. You are responsible for keeping that account secure ' +
            'and for what is done through it.',
        ],
      },
      {
        heading: 'Your content',
        paragraphs: [
          'What you add to your lists is yours. I only store and show it so the apps work for you. ' +
            'How I handle your data is described in the privacy policy.',
        ],
      },
      {
        heading: 'Fair use',
        paragraphs: [
          'Do not misuse the service: no attempts to access other people’s data, break or overload the site, ' +
            'or use it for anything illegal. I may suspend or delete accounts that do.',
        ],
      },
      {
        heading: 'No guarantees',
        paragraphs: [
          'The apps are free and provided “as is”. I do my best to keep them running and your data safe, ' +
            'but I cannot promise they will always be available or free of errors. Do not rely on them for anything critical.',
          'To the extent the law allows, I am not liable for any loss caused by using the service, including lost data.',
        ],
      },
      {
        heading: 'Ending',
        paragraphs: [
          `You can stop using the service at any time and ask me to delete your account at ${CONTACT}. ` +
            'I may change or shut down the service; if I do, I will try to give notice so you can save your lists.',
        ],
      },
      {
        heading: 'Changes and law',
        paragraphs: [
          'I may update these terms. The date at the top shows when they last changed. ' +
            'Danish law applies, and disputes are settled by Danish courts.',
          `Questions: ${CONTACT}`,
        ],
      },
    ] as LegalSection[],
  },
};

export type Translations = typeof en;

const da: Translations = {
  language: 'Sprog',
  titles: {
    timer: 'Timer',
    todo: 'Opgaver',
    groceries: 'Indkøb',
    privacy: 'Privatlivspolitik',
    terms: 'Servicevilkår',
    login: 'Log ind',
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
  auth: {
    title: 'Log ind',
    intro: 'Log ind for at bruge timer, opgaver og indkøbsliste. Dine lister følger med på alle dine enheder.',
    google: 'Log ind med Google',
    waiting: 'Venter på Google…',
    failed: 'Login mislykkedes eller blev annulleret. Prøv igen.',
    acceptPrefix: 'Når du logger ind, accepterer du',
    termsLink: 'servicevilkårene',
    and: 'og',
    privacyLink: 'privatlivspolitikken',
    signIn: 'Log ind',
    account: 'Konto',
    signOut: 'Log ud',
  },
  legal: {
    updated: 'Sidst opdateret: 7. oktober 2026',
    privacy: [
      {
        heading: 'Hvem jeg er',
        paragraphs: [
          'benjaminfester.dk og dens apps (timer, opgaver og indkøb) drives af mig, Benjamin Fester, ' +
            'privatperson i København. Jeg er dataansvarlig for de personoplysninger, der beskrives her.',
          `Spørgsmål eller anmodninger: ${CONTACT}`,
        ],
      },
      {
        heading: 'Hvad jeg indsamler',
        paragraphs: [
          'Når du logger ind med Google, modtager jeg dit navn, din e-mailadresse og dit profilbillede fra Google. ' +
            'Jeg får ikke din Google-adgangskode og beder ikke om adgang til andet på din Google-konto.',
          'Jeg gemmer det, du skriver i apps’ene – dine opgaver og varer – så de er ens på alle dine enheder.',
          'Dit sprogvalg og din timer gemmes kun i din egen browser (local storage) og sendes aldrig til mig.',
        ],
      },
      {
        heading: 'Hvad jeg bruger dem til',
        paragraphs: [
          'Dine data bruges kun til at logge dig ind og vise dig dine egne lister. ' +
            'Retsgrundlaget er, at det er nødvendigt for at levere den tjeneste, du har bedt om (GDPR artikel 6, stk. 1, litra b).',
          'Jeg sælger ikke dine data, viser ingen reklamer, bruger ikke analyseværktøjer eller sporingscookies ' +
            'og bruger ikke dine data til at træne AI-modeller.',
        ],
      },
      {
        heading: 'Data fra Google',
        paragraphs: [
          'Brugen af oplysninger modtaget fra Googles API’er følger Google API Services User Data Policy, ' +
            'herunder kravene om begrænset brug (Limited Use). Dine Google-data bruges kun til at logge dig ind ' +
            'og deles eller overføres aldrig til andre.',
        ],
      },
      {
        heading: 'Hvor de gemmes, og hvem der ser dem',
        paragraphs: [
          'Din konto og dine lister gemmes i en database på en server, som jeg selv lejer og driver. Kun jeg har adgang til den.',
          'Google står for login, og ikoner på siden hentes fra Cloudflare (cdnjs), ' +
            'hvilket betyder, at din browser sender din IP-adresse til dem. Ingen andre modtager dine data.',
        ],
      },
      {
        heading: 'Hvor længe jeg gemmer dem',
        paragraphs: [
          'Jeg gemmer din konto og dine lister, så længe du har en konto. Ting, du sletter, slettes med det samme. ' +
            'Beder du mig slette din konto, sletter jeg den og alle dens data inden for 30 dage.',
        ],
      },
      {
        heading: 'Dine rettigheder',
        paragraphs: [
          'Du kan bede om at se, rette, eksportere eller slette dine data eller gøre indsigelse mod, hvordan de bruges. ' +
            `Skriv blot til ${CONTACT}. Du kan også når som helst fjerne sidens adgang i indstillingerne for din Google-konto.`,
          'Mener du, at jeg behandler dine data forkert, kan du klage til Datatilsynet (datatilsynet.dk).',
        ],
      },
      {
        heading: 'Ændringer',
        paragraphs: [
          'Hvis politikken ændres, opdaterer jeg den her og ændrer datoen øverst. ' +
            'Ved større ændringer giver jeg dig besked, når du logger ind.',
        ],
      },
    ],
    terms: [
      {
        heading: 'Tjenesten',
        paragraphs: [
          'benjaminfester.dk tilbyder små personlige apps – en timer, en opgaveliste og en indkøbsliste – ' +
            'som drives af mig, Benjamin Fester, som et hobbyprojekt. Ved at logge ind eller bruge apps’ene accepterer du disse vilkår.',
        ],
      },
      {
        heading: 'Din konto',
        paragraphs: [
          'Du logger ind med din Google-konto. Du er selv ansvarlig for at holde den sikker ' +
            'og for det, der gøres via den.',
        ],
      },
      {
        heading: 'Dit indhold',
        paragraphs: [
          'Det, du tilføjer til dine lister, er dit. Jeg gemmer og viser det kun, så apps’ene virker for dig. ' +
            'Hvordan jeg behandler dine data, står i privatlivspolitikken.',
        ],
      },
      {
        heading: 'Rimelig brug',
        paragraphs: [
          'Misbrug ikke tjenesten: ingen forsøg på at tilgå andres data, ødelægge eller overbelaste siden ' +
            'eller bruge den til noget ulovligt. Jeg kan suspendere eller slette konti, der gør det.',
        ],
      },
      {
        heading: 'Ingen garantier',
        paragraphs: [
          'Apps’ene er gratis og leveres, som de er. Jeg gør mit bedste for at holde dem kørende og dine data sikre, ' +
            'men jeg kan ikke love, at de altid er tilgængelige eller fejlfri. Brug dem ikke til noget kritisk.',
          'I det omfang loven tillader det, er jeg ikke ansvarlig for tab som følge af brug af tjenesten, herunder tabte data.',
        ],
      },
      {
        heading: 'Ophør',
        paragraphs: [
          `Du kan til enhver tid stoppe med at bruge tjenesten og bede mig slette din konto på ${CONTACT}. ` +
            'Jeg kan ændre eller lukke tjenesten; sker det, forsøger jeg at varsle det, så du kan gemme dine lister.',
        ],
      },
      {
        heading: 'Ændringer og lovvalg',
        paragraphs: [
          'Jeg kan opdatere disse vilkår. Datoen øverst viser, hvornår de sidst blev ændret. ' +
            'Dansk ret gælder, og tvister afgøres ved danske domstole.',
          `Spørgsmål: ${CONTACT}`,
        ],
      },
    ],
  },
};

export const translations: Record<Lang, Translations> = { en, da };
