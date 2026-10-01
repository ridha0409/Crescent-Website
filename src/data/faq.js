/**
 * FAQ — single source of truth
 * ---------------------------------------------------------------------------
 * The ten questions the Institute publishes on its own FAQ page, in the exact
 * order they appear there:
 *   https://online.crescent-institute.edu.in/faq
 *
 * Nothing is invented and nothing is dropped. Both the home-page FAQ teaser
 * (components/FAQ.jsx) and the full FAQ page (pages/FAQPage.jsx) read from this
 * list, so the two can never drift apart the way they had.
 *
 * Figures that also live elsewhere in the project — the fee per semester, the
 * eligibility bar, the interaction window — are written here as the FAQ page
 * words them. If the Institute revises the FAQ, this file is the only edit.
 */

export const faqs = [
  {
    id: 'what-is-online-mba-mca',
    q: 'What is an Online MBA / MCA program?',
    a: [
      'An Online MBA is a postgraduate-level business degree that is earned online through a virtual platform. It covers core business competencies such as management, accounting, finance, marketing, operations and strategy.',
      'An Online MCA (Master of Computer Applications) is a postgraduate degree covering various computer application-based concepts such as programming languages, data structures, algorithms, software development and more.',
    ],
  },
  {
    id: 'duration',
    q: 'How long does it take to complete an Online MBA / MCA program?',
    a: ['Typically, it takes 2 years to complete an Online MBA / MCA program.'],
  },
  {
    id: 'work-while-studying',
    q: 'Can I work while pursuing an Online MBA / MCA program?',
    a: [
      'Yes. The programmes are designed to cater to working professionals who want to advance their careers while working.',
    ],
  },
  {
    id: 'registration-process',
    q: 'What is the registration process for an Online MBA program?',
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
    q: 'Is an Online MBA / MCA degree considered less valuable than an on-campus MBA / MCA?',
    a: [
      'No. Online MBA / MCA degrees are just as valuable as on-campus MBA / MCA degrees as per UGC declaration.',
    ],
  },
  {
    id: 'cost',
    q: 'What is the cost of an Online MBA and MCA program?',
    a: [
      'The cost of the Online MBA program is Rs. 40,000 per semester. The cost of the Online MCA program is Rs. 30,000 per semester.',
    ],
    // Rendered as a small table under the answer — same figures, easier to scan.
    table: {
      columns: ['Programme', 'Fee per semester'],
      rows: [
        ['Online MBA', 'Rs. 40,000'],
        ['Online MCA', 'Rs. 30,000'],
      ],
    },
  },
  {
    id: 'eligibility',
    q: 'What are the eligibility requirements for an Online MBA program?',
    a: [
      'MBA — Any Bachelor Degree (minimum 3 years duration) with a minimum CGPA of 5.0 / 50% of marks.',
      'MCA — Any undergraduate Degree with Computer Applications, Computer Science or Engineering branch, with a minimum CGPA of 5.0 / 50% of marks.',
    ],
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
  `${item.q} ${item.a.join(' ')}`.toLowerCase()
