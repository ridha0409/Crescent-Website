/**
 * STUDENTS CORNER — single source of truth
 * ---------------------------------------------------------------------------
 * Content mirrored from the official CDOE site:
 *   https://online.crescent-institute.edu.in/               (Students Corner menu)
 *   https://online.crescent-institute.edu.in/studentaffairs (SGRC page)
 *   https://online.crescent-institute.edu.in/complaintform  (online complaint form)
 *
 * The LMS portal URL is imported from admission.js so the address is declared
 * exactly once in the codebase.
 */

import { admissionLinks } from './admission.js'

export const studentLinks = {
  lmsLogin: admissionLinks.lmsLogin,
  /* The complaint form now lives on THIS site (src/pages/ComplaintForm.jsx),
     so it is an internal route, not an external URL — a learner raising a
     grievance never gets bounced to another host mid-complaint. */
  complaintForm: '/students/complaint-form',
}

/** The Students Grievance Redressal Cell, as published on the Student Affairs page. */
export const grievanceCell = {
  name: 'Students Grievance Redressal Cell',
  abbreviation: 'SGRC',
  location: "Convention Centre, B.S. Abdur Rahman Crescent Institute of Science & Technology",
  nodalOfficer: {
    name: 'Ms. P. Paul Merline',
    designation: 'Technical Manager (LMS & Data Management) & Nodal Officer',
    // Same portrait the CDOE Team › Technical Team card uses.
    photo: `${import.meta.env.BASE_URL}img/technical/merline.jpg`,
  },
  // Verbatim from the official Student Affairs page.
  statement:
    'Students having any Grievance on Academic matters may contact the Nodal Officer in person or drop a letter in the Grievance Box elaborating your grievance or submit your grievance online through our Institute website or email your grievance to cdoe.studentsgrievances@crescent.education. Your grievance will be redressed as earlier as possible based on the nature of the issue.',
  phone: '+91 96000 77262',
  tel: '+919600077262',
  email: 'cdoe.studentsgrievances@crescent.education',
  supportEmail: 'cdoesupport@crescent.education',
}

/** The four routes a learner can use to raise a grievance. */
export const grievanceChannels = [
  {
    title: 'In person',
    body: 'Meet the Nodal Officer at the Students Grievance Redressal Cell in the Institute Convention Centre.',
  },
  {
    title: 'Grievance Box',
    body: 'Drop a letter elaborating your grievance into the Grievance Box placed at the cell.',
  },
  {
    title: 'Online complaint form',
    body: 'Fill in the complaint form on this site — it is emailed straight to CDOE support, with a reference number you can quote later.',
    action: { label: 'Open the complaint form', href: 'complaintForm' },
  },
  {
    title: 'Email',
    body: 'Write to the grievance cell directly and your complaint is logged the same way.',
    action: { label: 'cdoe.studentsgrievances@crescent.education', mailto: true },
  },
]

/**
 * Documents published on the Student Affairs page. `doc` is a registry id in
 * src/data/documents.js — the file is served from this site.
 *
 * The UGC grievance letter is published by the Institute as a PNG image rather
 * than a PDF, so it is not in the registry yet; drop a PDF of it into
 * src/assets/PDF, register it, and add its id back here.
 */
export const studentDocuments = []
