/**
 * ADMISSION — single source of truth
 * ---------------------------------------------------------------------------
 * Content mirrored from the official CDOE site:
 *   https://online.crescent-institute.edu.in/          (Admission menu)
 *   https://online.crescent-institute.edu.in/how-to-apply
 *   Admission Notification AY 2023 (PDF, linked below)
 *
 * The Navbar, the Admission sidebar and both Admission pages all read from
 * this file — update a link or a phone number here and it changes everywhere.
 */

/** External portals — these live on the institute's admission server. */
export const admissionLinks = {
  newRegistration: 'https://admission.crescent-institute.edu.in/login/signup.php',
  applyOnline: 'https://admission.crescent-institute.edu.in/login/index.php',
  applicantLogin: 'https://admission.crescent-institute.edu.in/login/index.php',
  lmsLogin: 'https://lmscdoe.crescent-institute.edu.in/login/index.php',
}

/*
 * The Admission Notification is a document, not a portal — it is registered in
 * src/data/documents.js and opens in this site's own viewer.
 */
export const notificationDocId = 'admission-notification'

/** The four steps of the online application, as published on "How to apply". */
export const applySteps = [
  {
    title: 'New Registration',
    body: 'Open the Admission menu and select New Registration. Create your account with a username, password and a valid email ID. An activation link is sent to that email address — click it to activate your account.',
    action: { label: 'Register now', href: admissionLinks.newRegistration, external: true },
  },
  {
    title: 'Login',
    body: 'Return to the Admission menu and choose Apply Online or Applicant Login. Sign in with the credentials you just created to reach your application dashboard.',
    action: { label: 'Applicant login', href: admissionLinks.applicantLogin, external: true },
  },
  {
    title: 'Fill the Application Form',
    body: 'Click Apply Here and complete every required field, then upload your documents in the prescribed format and size. Check everything under View & Submit Application before you confirm.',
    note: 'Once the form is submitted, you will not be able to edit it afterwards.',
  },
  {
    title: 'Payment',
    body: 'Select Payment, then Pay now. The application fee can be paid by Credit Card, Debit Card, Net Banking or UPI. On successful payment your application number is generated and the confirmation can be downloaded.',
  },
]

/**
 * The single admissions number shown in the top bar.
 * Programme-wise numbers still live in `admissionContacts` and are used on the
 * Contact and How to Apply pages — this is just the one-line header version.
 */
export const primaryAdmissionPhone = { phone: '+91 97909 53750', tel: '+919790953750' }

/** Programme-wise admission helplines. */
export const admissionContacts = [
  { programme: 'MBA', phone: '+91 97909 53750', tel: '+919790953750' },
  { programme: 'MCA', phone: '+91 94444 37309', tel: '+919444437309' },
  { programme: 'BA Islamic Studies', phone: '+91 86675 30226', tel: '+918667530226' },
]

export const admissionEmails = {
  enquiry: 'cdoesupport@crescent.education',
  admissions: 'cdoe-admissions@crescent.education',
  grievances: 'cdoe.studentsgrievances@crescent.education',
}

export const grievanceHelpline = { phone: '+91 96000 77262', tel: '+919600077262' }

export const campusAddress = 'GST Road, Vandalur, Chennai 600 048'

/** Eligibility as stated in the Admission Notification PDF. */
export const notificationHighlights = {
  applicationFee: '₹ 1,000',
  programmes: [
    {
      name: 'Master of Business Administration (MBA)',
      eligibility:
        'Any Bachelor Degree of minimum 3 years duration with a minimum CGPA of 5.0 / 50% of marks.',
      selection:
        'Based on the undergraduate performance and the Crescent School of Business Admission Test. Candidates with a valid CAT, MAT, XAT or TANCET score are exempt from the test.',
    },
    {
      name: 'Master of Computer Applications (MCA)',
      eligibility:
        'A Bachelor degree in Computer Applications, Computer Science or Engineering — or in Mathematics, Physics, Chemistry or Commerce with Mathematics at graduation or 10+2 level — with a minimum CGPA of 5.0 / 50% of marks. Completion of the Bachelor degree through the 10+2+3/4 year pattern.',
    },
    {
      name: 'Bachelor of Arts in Islamic Studies (BA)',
      eligibility:
        'A pass in 10+2 (Higher Secondary) or its equivalent from a recognized board.',
    },
  ],
}

/** Payment modes accepted for the application fee. */
export const paymentModes = ['Credit Card', 'Debit Card', 'Net Banking', 'UPI']

/**
 * THE Apply Now destination.
 * ---------------------------------------------------------------------------
 * The official site's "APPLY NOW" button opens the admission portal's sign-up
 * page, so a first-time applicant lands on registration rather than a login
 * wall. Every Apply CTA in this project points here — always through the
 * <ApplyNow /> component, never a hard-coded URL — so the destination can be
 * changed in exactly one place.
 */
export const applyNowUrl = admissionLinks.newRegistration

/** "Apply Online" — for someone who already has an applicant account. */
export const applyOnlineUrl = admissionLinks.applyOnline
