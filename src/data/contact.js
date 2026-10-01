/**
 * CONTACT — single source of truth
 * ---------------------------------------------------------------------------
 * Mirrored from the Contact / footer section of the official CDOE site:
 *   https://online.crescent-institute.edu.in/
 *
 * Phone numbers and email addresses are imported from admission.js rather than
 * repeated here, so a number is declared exactly once across the whole project.
 */

import {
  admissionContacts,
  admissionEmails,
  grievanceHelpline,
} from './admission.js'

export { admissionContacts, admissionEmails, grievanceHelpline }

export const campus = {
  centre: 'Centre for Distance and Online Education (CDOE)',
  institute: 'B.S. Abdur Rahman Crescent Institute of Science & Technology',
  addressLines: ['G.S.T Road, Vandalur', 'Chennai 600 048', 'Tamil Nadu, India'],
  /** Coordinates published with the embedded map on the official site. */
  coordinates: { lat: 12.875743, lng: 80.081564 },
}

/** Keyless Google Maps embed — no API key needed for this form. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${campus.coordinates.lat},${campus.coordinates.lng}&z=16&output=embed`

/** Opens the campus in the viewer's own maps app. */
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${campus.coordinates.lat},${campus.coordinates.lng}`

/** Who to write to, and what for. */
export const contactEmails = [
  {
    label: 'General enquiries & student support',
    email: admissionEmails.enquiry,
  },
  {
    label: 'Admissions',
    email: admissionEmails.admissions,
  },
  {
    label: 'Student grievances',
    email: admissionEmails.grievances,
  },
]
