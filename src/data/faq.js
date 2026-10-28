/**
 * FAQ — single source of truth
 * ---------------------------------------------------------------------------
 * The questions the Institute publishes on its own FAQ page
 *   https://online.crescent-institute.edu.in/faq
 * worded as common questions that hold for every programme — no single course
 * is named, so nothing goes stale when a programme is added. Anything that
 * differs by programme (fee, eligibility detail) points to the programme pages.
 * Three on the DEB ID and ABC ID, which UGC makes mandatory for every online
 * admission, come first.
 *
 * Both the home-page FAQ teaser
 * (components/FAQ.jsx) and the full FAQ page (pages/FAQPage.jsx) read from this
 * list, so the two can never drift apart the way they had.
 *
 * If the Institute revises the FAQ, this file is the only edit.
 */

export const faqs = [
  /* ---- DEB ID / ABC ID — kept first on purpose: no admission goes through
     without them, so they are the first thing an applicant should read. ---- */
  {
    id: 'deb-id-mandatory',
    q: 'Is a DEB ID mandatory for admission to an online programme?',
    a: [
      'Yes. As per the UGC, a DEB ID (Distance Education Bureau Unique ID) is mandatory for every learner taking admission to an Online / Open and Distance Learning programme. Without a valid DEB ID the admission cannot be completed.',
      'The DEB ID is valid for life, so if you already have one, use the same ID — you do not need to create a new one.',
    ],
    links: [{ label: 'Register for DEB ID', href: 'https://deb.ugc.ac.in/StudentDebId' }],
  },
  {
    id: 'create-deb-id',
    q: 'How do I create a DEB ID?',
    a: ['The DEB ID is generated on the UGC-DEB portal using your ABC ID, so create your ABC ID first.'],
    steps: [
      'Create your ABC ID (Academic Bank of Credits) on abc.gov.in or through DigiLocker, if you do not already have one.',
      'Open the UGC-DEB student registration page (link below).',
      'Enter your ABC ID and verify it with the OTP sent to your Aadhaar-linked mobile number.',
      'Fill in your details and submit — your DEB ID is generated and shown on screen.',
      'Note the DEB ID down and enter it in the Crescent online application form. Use the same email ID and mobile number on the application as on your DEB ID.',
    ],
    links: [
      { label: 'DEB ID registration', href: 'https://deb.ugc.ac.in/StudentDebId' },
      { label: 'Create ABC ID', href: 'https://www.abc.gov.in/' },
    ],
  },
  {
    id: 'abc-id-mandatory',
    q: 'Is an ABC ID mandatory for online education?',
    a: [
      'Yes. An ABC ID (Academic Bank of Credits ID) is mandatory for online education. It stores the credits you earn, and it is needed to generate your DEB ID — so no admission to an online programme can be completed without it.',
      'You can create it free of cost on the ABC portal or through DigiLocker using your Aadhaar-linked mobile number.',
    ],
    links: [
      { label: 'Create ABC ID', href: 'https://www.abc.gov.in/' },
      { label: 'DigiLocker', href: 'https://www.digilocker.gov.in/' },
    ],
  },
  {
    id: 'what-is-online-programme',
    q: 'What is an online degree programme?',
    a: [
      'An online degree programme is a UGC-entitled degree earned through a virtual learning platform. You study through self-learning material, recorded lectures and live interactive sessions, and write your exams online — without attending classes on campus.',
    ],
  },
  {
    id: 'duration',
    q: 'How long does it take to complete an online programme?',
    a: [
      'It depends on the level of the programme: postgraduate programmes typically take 2 years and undergraduate programmes 3 years. The exact duration is listed on each programme page.',
    ],
  },
  {
    id: 'work-while-studying',
    q: 'Can I work while pursuing an online programme?',
    a: [
      'Yes. The programmes are designed to cater to working professionals who want to advance their careers while working.',
    ],
  },
  {
    id: 'registration-process',
    q: 'What is the registration process for an online programme?',
    a: [
      'The registration process happens two times a year (Academic Month – June, Calendar Month – January).',
    ],
  },
  {
    id: 'study-material',
    q: 'Will I get study material and lectures from the faculty?',
    a: [
      "Yes. You will be getting Study Materials in the form of Self-Learning Material to read and learn, hereby you don't need to buy any books.",
      'You will also get Interactive video lectures in the form of Digital Self-Learning Materials, so you can view, listen and study subjective topics independently.',
    ],
  },
  {
    id: 'degree-value',
    q: 'Is an online degree considered less valuable than an on-campus degree?',
    a: [
      'No. As per UGC declaration, degrees earned online are just as valuable as their on-campus equivalents.',
    ],
  },
  {
    id: 'cost',
    q: 'What is the fee for an online programme?',
    a: [
      'The fee differs from programme to programme. The fee for each programme, and how it is paid, is listed on that programme’s page.',
    ],
    links: [{ label: 'View programmes', href: '/programmes' }],
  },
  {
    id: 'eligibility',
    q: 'What are the eligibility requirements for an online programme?',
    a: [
      'Undergraduate programmes — a pass in the Higher Secondary Examination (10+2), or any examination accepted by the Institution as equivalent.',
      'Postgraduate programmes — a recognised bachelor’s degree with a minimum CGPA of 5.0 / 50% of marks. Some programmes also ask for a particular background in the degree.',
      'The exact criteria for each programme are listed on its programme page.',
    ],
    links: [{ label: 'View programmes', href: '/programmes' }],
  },
  {
    id: 'exam-mode',
    q: 'Will the exam be conducted Online or On-Campus?',
    a: ['The exams will be conducted through Online Mode using LMS.'],
  },
  {
    id: 'faculty-interaction',
    q: 'Will I get an opportunity to interact with the faculty to clarify the doubts in respective subjects?',
    a: [
      'Yes. Every working day the online learners will have an interactive session between 6:30 – 8:30 P.M.',
    ],
  },
]

/** The short list the home page shows before "View All FAQs". */
export const featuredFaqs = faqs.slice(0, 6)

/** Plain-text haystack for the search box on the full FAQ page. */
export const faqSearchText = (item) =>
  `${item.q} ${item.a.join(' ')} ${(item.steps || []).join(' ')}`.toLowerCase()
