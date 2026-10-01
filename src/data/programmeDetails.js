/**
 * PROGRAMME DETAILS — people, fees, documents and overview
 * ---------------------------------------------------------------------------
 * Mirrored from the per-programme pages of the official CDOE site:
 *   /baispeople  /bais_eligiblity  /bais_syllabus
 *   /mba-people  /mba-eligiblity   /mba-syllabus
 *   /mca-people  /mca-eligiblity   /mca-syllabus
 *
 * Keyed by the same slug used in the route (`/programmes/<key>`), so the tab
 * card on a programme page finds its content with one lookup.
 *
 * NOTE ON FEES: the Institute publishes MBA and MCA tuition PER SEMESTER and
 * BA Islamic Studies PER YEAR. They are labelled exactly that way below —
 * do not "normalise" them, the difference is real.
 */

const HOST = 'https://online.crescent-institute.edu.in'

/*
 * PHOTOGRAPHS
 * Five faculty portraits already live in this repo (src/assets/faculty) and are
 * imported so they are bundled and always available. The remaining portraits
 * are served from the Institute's own site — the same files the official
 * people pages use. Note the Institute publishes several of those hrefs with
 * Windows backslashes; they are written here with forward slashes so fetches
 * and link checkers resolve them too.
 */
import photoThowseaf from '../assets/faculty/dr-s-thowseaf.jpg'
import photoAgalya from '../assets/faculty/dr-v-agalya.jpg'
import photoJeslin from '../assets/faculty/dr-e-jeslin-renjith.jpg'
import photoMaheswari from '../assets/faculty/dr-p-maheswari.jpg'
import photoManjula from '../assets/faculty/mrs-s-manjula.jpg'

const PHOTO = {
  // BA / MA Islamic Studies
  abdulHai: `${import.meta.env.BASE_URL}img/bais/ABDULHAIHASANINADWI.jpg`,
  mohideen: `${import.meta.env.BASE_URL}img/bais/Dr.-K.J.-Mohideen-Abdul-Kadir-Hasani.jpg`,
  syedMasoodJamali: `${import.meta.env.BASE_URL}img/bais/SYEDMASOODJAMALI.jpg`,
  // BA Public Policy
  zafarTabrez: `${import.meta.env.BASE_URL}img/public-policy/dr-zafar-tabrez.jpg`,
  towseefGanai: `${import.meta.env.BASE_URL}img/public-policy/dr-towseef-ahmad-ganai.jpg`,
  // BA English
  vijayakumar: `${import.meta.env.BASE_URL}img/english/dr-s-vijayakumar.png`,
  muththamizhSelvi: `${import.meta.env.BASE_URL}img/english/dr-muththamizh-selvi.jpg`,
  // MBA
  srinivasan: `${import.meta.env.BASE_URL}img/mba/people/dr-k-srinivasan.png`,
  // MCA
  sharmilaSankar: `${import.meta.env.BASE_URL}img/execution/DR.SHARMILASANKAR.jpg`,
  syedMasood: `${import.meta.env.BASE_URL}img/mca/people/MR.M.SYEDMASOOD.jpg`,
}

/*
 * PEOPLE — one flat list per programme, holding only the staff concerned with
 * that programme. The official site splits this into a department block and a
 * "CDOE Team" block that repeats the same names; here each person appears
 * once, with their department role and academic designation on one line.
 */

/** The Islamic Studies faculty — they teach both the BA and the MA. */
const islamicStudiesPeople = [
  {
    name: 'Moulavi Dr. P. S. Syed Masood Jamali',
    role: 'Professor',
    photo: PHOTO.syedMasoodJamali,
  },
  {
    name: 'Moulavi Dr. A. Abdul Hai Hasani Nadwi',
    role: 'Associate Professor & Dean',
    photo: PHOTO.abdulHai,
  },
  {
    name: 'Dr. K. J. Mohideen Abdul Kadir Hasani',
    role: 'Assistant Professor & Programme Coordinator',
    photo: PHOTO.mohideen,
  },
]

export const programmeDetails = {
  'ba-islamic-studies': {
    people: islamicStudiesPeople,
    eligibility:
      'A pass in the Higher Secondary Examination of the 10+2 curriculum (Academic stream), or any other examination accepted by the Institution as equivalent. Marks, number of attempts and physical fitness requirements follow the Institution’s regulations.',
    selection: null,
    fees: {
      indian: [
        { item: 'Application Fee', amount: '₹ 1,000' },
        { item: 'Tuition Fee (per year)', amount: '₹ 15,000' },
      ],
      foreign: [
        { item: 'Application Fee', amount: '$ 25' },
        { item: 'Tuition Fee (per year)', amount: '$ 300' },
      ],
    },
    documents: {
      // Registry ids — the PDFs are bundled with this site and open in its own
      // viewer. See src/data/documents.js. `syllabusHref` is still the
      // Institute's own page: the syllabus is published as a web page, not a PDF.
      regulations: 'regulations-ba-islamic-studies',
      brochure: 'brochure-ba-islamic-studies',
      syllabusHref: `${HOST}/bais_syllabus`,
    },
    overview:
      'The Bachelor of Arts in Islamic Studies is a three-year undergraduate programme delivered fully online. It builds a grounded understanding of Islamic history, theology and jurisprudence alongside the language skills needed to read primary sources, and is taught by the same faculty who teach the subject on campus.',
    outcomes: [
      'Read and interpret primary Islamic texts with an understanding of their historical context',
      'Trace the development of Islamic jurisprudence and the major schools of thought',
      'Communicate scholarly ideas clearly in writing and in discussion',
      'Progress to postgraduate study or to teaching, research and community roles',
    ],
  },

  mba: {
    people: [
      { name: 'Dr. K. Srinivasan', role: 'Head of Department', photo: PHOTO.srinivasan },
      {
        name: 'Dr. V. Agalya',
        role: 'Assistant Professor & Programme Coordinator',
        photo: photoAgalya,
      },
      { name: 'Dr. S. Thowseaf', role: 'Assistant Professor', photo: photoThowseaf },
    ],
    eligibility:
      'Any Bachelor’s degree of minimum three years’ duration with a CGPA of 5.0 or 50% of marks.',
    selection:
      'Admission is based on the CGPA or percentage obtained in the UG degree together with performance in the Crescent School of Business admission test. Candidates holding a valid CAT, MAT, XAT or TANCET score are exempt from the test.',
    fees: {
      indian: [
        { item: 'Application Fee', amount: '₹ 1,000' },
        { item: 'Tuition Fee (per semester)', amount: '₹ 40,000' },
      ],
      foreign: [
        { item: 'Application Fee', amount: '$ 15' },
        { item: 'Tuition Fee (per semester)', amount: '$ 1,000' },
      ],
    },
    documents: {
      regulations: 'regulations-mba-mca',
      brochure: 'brochure-mba',
      syllabusHref: `${HOST}/mba-syllabus`,
    },
    overview:
      'The Master of Business Administration is a two-year postgraduate programme delivered online for working professionals. It covers finance, marketing, human resources and operations through live interactive classes with recorded backups, and carries the same UGC entitlement and AICTE approval as the on-campus degree.',
    outcomes: [
      'Apply core management principles across finance, marketing, HR and operations',
      'Read financial statements and build the case for an investment or a cost decision',
      'Lead teams and manage change in a working organisation',
      'Analyse a business problem with data and defend a recommendation',
    ],
  },

  mca: {
    people: [
      { name: 'Dr. Sharmila Sankar', role: 'Dean', photo: PHOTO.sharmilaSankar },
      { name: 'Dr. M. Syed Masood', role: 'Head of Department', photo: PHOTO.syedMasood },
      {
        name: 'Dr. E. Jeslin Renjith',
        role: 'Assistant Professor & Programme Coordinator',
        photo: photoJeslin,
      },
      { name: 'Dr. P. Maheswari', role: 'Assistant Professor', photo: photoMaheswari },
      { name: 'Mrs. S. Manjula', role: 'Assistant Professor', photo: photoManjula },
    ],
    eligibility:
      'A Bachelor’s degree in Computer Applications, Computer Science or Engineering with a CGPA of 5.0 or 50% of marks — or a degree in Mathematics, Physics, Chemistry or Commerce with Mathematics at graduation or 10+2 level, with the same minimum.',
    selection:
      'Admission is based on the CGPA or percentage obtained in the UG degree together with performance in the Crescent PG Entrance Examination (CPGEE). Candidates holding a valid national entrance score such as TANCET are exempt.',
    fees: {
      indian: [
        { item: 'Application Fee', amount: '₹ 1,000' },
        { item: 'Tuition Fee (per semester)', amount: '₹ 30,000' },
      ],
      foreign: [
        { item: 'Application Fee', amount: '$ 15' },
        { item: 'Tuition Fee (per semester)', amount: '$ 750' },
      ],
    },
    documents: {
      regulations: 'regulations-mba-mca',
      brochure: 'brochure-mca',
      syllabusHref: `${HOST}/mca-syllabus`,
    },
    overview:
      'The Master of Computer Applications is a two-year postgraduate programme delivered online. It covers modern programming languages, data structures, databases and software engineering with hands-on assignments, and is taught by the Institute’s own computer science faculty.',
    outcomes: [
      'Design and build software using current languages, frameworks and tooling',
      'Model and query data, and reason about the performance of what you build',
      'Apply software engineering practice from requirements through to testing',
      'Move into development, data or systems roles, or on to research',
    ],
  },
}

/*
 * THE NEWER UNDERGRADUATE PROGRAMMES — BA Public Policy and BA English
 * ---------------------------------------------------------------------------
 * The Institute has not published a separate regulation, syllabus or brochure
 * for either of these yet. Both are three-year BA programmes run by the same
 * CDOE undergraduate desk as BA Islamic Studies, under the same regulations and
 * admitted on the same terms, so the shared material below is carried across
 * from that programme rather than left blank:
 *
 *   - the 10+2 eligibility rule
 *   - the UG fee structure (application fee + tuition charged PER YEAR)
 *   - the regulation, syllabus and brochure documents
 *
 * People are NOT shared — each programme lists only its own staff. Replace any
 * of the shared material the moment the Institute publishes programme-specific
 * material.
 */

/** 10+2 rule — identical across the undergraduate programmes. */
const ugEligibility =
  'A pass in the Higher Secondary Examination of the 10+2 curriculum (Academic stream), or any other examination accepted by the Institution as equivalent. Marks, number of attempts and physical fitness requirements follow the Institution’s regulations.'

/** UG fees are charged PER YEAR, unlike the per-semester PG programmes. */
const ugFees = {
  indian: [
    { item: 'Application Fee', amount: '₹ 1,000' },
    { item: 'Tuition Fee (per year)', amount: '₹ 15,000' },
  ],
  foreign: [
    { item: 'Application Fee', amount: '$ 25' },
    { item: 'Tuition Fee (per year)', amount: '$ 300' },
  ],
}

/** The UG regulation, syllabus and brochure the BA programmes share. */
const ugDocuments = {
  regulations: 'regulations-ba-islamic-studies',
  brochure: 'brochure-ba-islamic-studies',
  syllabusHref: `${HOST}/bais_syllabus`,
}

programmeDetails['ba-public-policy'] = {
  people: [
    { name: 'Dr. Venkatesh Lokesh', role: 'Programme Coordinator' },
    { name: 'Dr. Zafar Tabrez', role: 'Faculty, Public Policy', photo: PHOTO.zafarTabrez },
    {
      name: 'Dr. Towseef Ahmad Ganai',
      role: 'Faculty, Public Policy',
      photo: PHOTO.towseefGanai,
    },
  ],
  eligibility: ugEligibility,
  selection: null,
  fees: ugFees,
  documents: ugDocuments,
  overview:
    'The Bachelor of Arts in Public Policy is a three-year undergraduate programme delivered fully online. It introduces the institutions of Indian governance, the economics behind public decisions and the methods used to analyse a policy — from framing a problem through to evaluating what a programme actually achieved.',
  outcomes: [
    'Explain how public decisions are made across the legislature, executive and judiciary',
    'Read a budget, a bill or a scheme document and identify who gains and who bears the cost',
    'Analyse a policy problem with evidence and defend a recommendation in writing',
    'Progress to postgraduate study or to roles in government, research and the development sector',
  ],
}

programmeDetails['ba-english'] = {
  people: [
    {
      name: 'Dr. S. Vijayakumar',
      role: 'Programme Coordinator, English',
      photo: PHOTO.vijayakumar,
    },
    {
      name: 'Dr. Muththamizh Selvi S. I.',
      role: 'Faculty, English',
      photo: PHOTO.muththamizhSelvi,
    },
  ],
  eligibility: ugEligibility,
  selection: null,
  fees: ugFees,
  documents: ugDocuments,
  overview:
    'The Bachelor of Arts in English is a three-year undergraduate programme delivered fully online. It covers British, American and Indian writing in English alongside the language, criticism and communication skills the degree is built on, and is taught by the Institute’s own English faculty.',
  outcomes: [
    'Read closely across poetry, fiction and drama and place a text in its literary period',
    'Apply the major schools of literary criticism and theory to a work',
    'Write and speak with clarity, precision and a command of academic English',
    'Progress to postgraduate study or to roles in teaching, publishing, media and communication',
  ],
}

programmeDetails['ma-islamic-studies'] = {
  // Taught by the same Islamic Studies faculty as the BA.
  people: islamicStudiesPeople,
  eligibility:
    'A Bachelor degree of minimum three years duration from a recognized university, in Islamic Studies or an allied discipline, with the minimum marks prescribed by the Institution.',
  selection: null,
  fees: null,
  documents: {},
  overview:
    'The Master of Arts in Islamic Studies is a two-year postgraduate programme delivered fully online. It builds on an undergraduate foundation with advanced work in theology, jurisprudence and Islamic intellectual history, together with the research methods and primary-source language skills needed for independent scholarship.',
  outcomes: [
    'Work directly with primary texts and the classical commentarial tradition',
    'Compare the major schools of jurisprudence and the reasoning behind their positions',
    'Design and carry out a piece of independent research to postgraduate standard',
    'Move into teaching, research, community leadership or doctoral study',
  ],
}

export function getProgrammeDetails(key) {
  return programmeDetails[key] || null
}
