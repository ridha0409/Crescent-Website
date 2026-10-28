// Spam protection shared by the website's forms (Enquire Now, Complaint form).
//
// Two quiet checks, invisible to real visitors:
//   1. A honeypot field. It is moved off-screen and hidden from screen readers
//      and the keyboard, so people never fill it — but form-filling bots do.
//      It is also sent to FormSubmit as `_honey`, which FormSubmit discards
//      server-side when it is filled.
//   2. A minimum fill time. Nobody completes these forms in under a couple of
//      seconds; scripts do.
// A submission that trips either check is dropped without sending, and the
// form shows its normal success message so the bot learns nothing.
//
// FormSubmit's own CAPTCHA cannot be used: it only appears on FormSubmit's
// redirect page, and both forms send in the background (AJAX).

export const HONEYPOT_NAME = '_honey'
const MIN_FILL_MS = 2500

/** True when a submission looks automated and should be silently dropped. */
export function looksLikeBot(honeypotValue, startedAt) {
  if (String(honeypotValue || '').trim()) return true
  return Date.now() - startedAt < MIN_FILL_MS
}

/** The off-screen honeypot input. Pass a ref to read its value on submit. */
export default function HoneypotField({ inputRef }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
    >
      <label>
        Leave this field empty
        <input ref={inputRef} type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}
