/**
 * CDOE ENQUIRY DIGEST — Google Apps Script
 * ---------------------------------------------------------------------------
 * The website's "Enquire Now" form posts every enquiry here. For each one:
 *   1. an email goes to the support inbox straight away, and
 *   2. it is stored as a row in the Google Sheet this script is attached to.
 * A time trigger (every DIGEST_EVERY_MINUTES, or once a day) then sends ONE
 * email with every enquiry received since the previous digest — as a table in
 * the mail body and as an Excel (.xlsx) attachment.
 *
 * Mail is sent from the Google account that owns this script, so there is no
 * third-party form service and nothing to "activate".
 *
 * Setup (one time) is described in apps-script/README.md.
 */

// ---- Settings ------------------------------------------------------------
// Who receives the enquiry emails — both the instant one per enquiry and the
// end-of-day digest. Separate several addresses with commas.
const DIGEST_TO = 'cdoesupport@crescent.education'
// Send an email the moment each enquiry arrives (in addition to the digest).
const SEND_INSTANT_EMAIL = true
// How often the digest is sent, in minutes. Google only allows 1, 5, 10, 15
// or 30. Set it to 0 to send once a day at DIGEST_HOUR instead.
const DIGEST_EVERY_MINUTES = 0
// Hour of the day (0–23, in the script's time zone) for the once-a-day digest.
// 23 = the end of the day: Google runs it between 11 PM and midnight.
// Only used when DIGEST_EVERY_MINUTES is 0.
const DIGEST_HOUR = 23
// Tab in the sheet that holds the enquiries.
const SHEET_NAME = 'Enquiries'
// Column 1 is always the timestamp; these follow it, in this order.
const FIELDS = ['Name', 'Phone', 'Email', 'Message', 'Page']

// ---- Receive an enquiry from the website ---------------------------------
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    // Simple guard: a real enquiry always has a name and a phone number.
    if (!String(data.Name || '').trim() || !String(data.Phone || '').trim()) {
      return json_({ success: false, message: 'Name and phone are required.' })
    }

    const row = [new Date()].concat(
      FIELDS.map((f) => String(data[f] || '').trim().slice(0, 2000))
    )

    // Two enquiries arriving at the same moment must not overwrite each other.
    const lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      getSheet_().appendRow(asText_(row))
    } finally {
      lock.releaseLock()
    }

    // The row is saved first, so even if the mail fails the enquiry is kept
    // and still appears in the end-of-day digest.
    if (SEND_INSTANT_EMAIL) {
      try {
        sendInstantEmail_(row)
      } catch (mailErr) {
        console.error('Instant enquiry email failed: ' + mailErr)
      }
    }

    return json_({ success: true })
  } catch (err) {
    return json_({ success: false, message: String(err) })
  }
}

// One enquiry, mailed the moment it arrives. Replying goes to the enquirer.
function sendInstantEmail_(row) {
  const tz = Session.getScriptTimeZone()
  const header = ['Received'].concat(FIELDS)
  const display = [Utilities.formatDate(row[0], tz, 'dd MMM yyyy, hh:mm a')].concat(row.slice(1))
  const name = row[1] || 'the website'
  const email = row[3]

  const lines = header
    .map((h, i) =>
      `<tr><th style="text-align:left;padding:7px 12px;background:#f1f4f9;border:1px solid #d0d7e2">${escape_(h)}</th>` +
      `<td style="padding:7px 12px;border:1px solid #d0d7e2">${escape_(display[i] || '—')}</td></tr>`
    )
    .join('')

  const options = {
    to: DIGEST_TO,
    subject: `New enquiry from ${name}`,
    htmlBody:
      '<p style="font-family:Arial,sans-serif">A new enquiry was submitted on the CDOE website.</p>' +
      `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px">${lines}</table>`,
    name: 'CDOE Website',
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) options.replyTo = email
  MailApp.sendEmail(options)
}

// Lets you open the web-app URL in a browser to check it is live.
function doGet() {
  return json_({ success: true, message: 'CDOE enquiry endpoint is running.' })
}

// ---- Daily digest (run by the time trigger) -------------------------------
function sendDailyDigest() {
  const sheet = getSheet_()
  const values = sheet.getDataRange().getValues()
  const header = values[0]

  // Everything received since the previous digest. Google runs a daily
  // trigger at a slightly different minute each day, so a fixed "last 24
  // hours" window could drop or repeat an enquiry; the stored time cannot.
  const props = PropertiesService.getScriptProperties()
  const now = new Date()
  const last = Number(props.getProperty('lastDigestAt')) || now.getTime() - 24 * 60 * 60 * 1000
  const since = new Date(last)

  const rows = values
    .slice(1)
    .filter((r) => r[0] instanceof Date && r[0] > since && r[0] <= now)

  const tz = Session.getScriptTimeZone()
  const today = Utilities.formatDate(new Date(), tz, 'dd MMM yyyy, hh:mm a')

  if (rows.length === 0) {
    // On a short interval an empty run sends nothing — otherwise the inbox
    // would get a "no new enquiries" mail every few minutes.
    if (DIGEST_EVERY_MINUTES) return
    MailApp.sendEmail({
      to: DIGEST_TO,
      subject: `CDOE enquiries — ${today}: no new enquiries`,
      htmlBody: '<p>No enquiries were received through the website since the last digest.</p>',
    })
    props.setProperty('lastDigestAt', String(now.getTime()))
    return
  }

  const displayRows = rows.map((r) =>
    [Utilities.formatDate(r[0], tz, 'dd MMM yyyy, hh:mm a')].concat(r.slice(1))
  )

  MailApp.sendEmail({
    to: DIGEST_TO,
    subject: `CDOE enquiries — ${today}: ${rows.length} new`,
    htmlBody: buildTable_(header, displayRows, rows.length),
    attachments: [buildXlsx_(header, displayRows, today)],
  })
  // Only moved forward once the mail has gone. If building or sending it
  // fails, the next run picks up the same enquiries instead of dropping them.
  props.setProperty('lastDigestAt', String(now.getTime()))
}

// ---- One-time setup: run this once from the Apps Script editor -----------
function setupDailyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'sendDailyDigest')
    .forEach((t) => ScriptApp.deleteTrigger(t))

  const trigger = ScriptApp.newTrigger('sendDailyDigest').timeBased()
  if (DIGEST_EVERY_MINUTES) {
    trigger.everyMinutes(DIGEST_EVERY_MINUTES).create()
  } else {
    trigger.everyDays(1).atHour(DIGEST_HOUR).create()
  }

  getSheet_() // creates the tab and header row if missing
}

// ---- Helpers ----------------------------------------------------------------
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received'].concat(FIELDS))
    sheet.getRange(1, 1, 1, FIELDS.length + 1).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

// Stores every text value as plain text. Without this, Sheets reads a phone
// number like "+91 97909 53750" as a formula (#ERROR!), drops the leading 0
// of "044…", and would run anything a visitor types that starts with "=".
// The leading apostrophe is not part of the value; getValues() omits it.
function asText_(row) {
  return row.map((v) => (typeof v === 'string' && v !== '' ? "'" + v : v))
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function escape_(v) {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildTable_(header, rows, count) {
  const th = header
    .map((h) => `<th style="background:#1b2f5c;color:#fff;padding:8px 10px;text-align:left;border:1px solid #d0d7e2">${escape_(h)}</th>`)
    .join('')
  const trs = rows
    .map((r, i) => {
      const bg = i % 2 ? '#f5f7fb' : '#ffffff'
      const tds = r
        .map((c) => `<td style="padding:7px 10px;border:1px solid #d0d7e2;vertical-align:top">${escape_(c)}</td>`)
        .join('')
      return `<tr style="background:${bg}">${tds}</tr>`
    })
    .join('')

  return (
    `<p style="font-family:Arial,sans-serif">${count} enquir${count === 1 ? 'y was' : 'ies were'} received through the website since the last digest (about 24 hours). ` +
    'The same list is attached as an Excel file.</p>' +
    `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px">` +
    `<thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`
  )
}

// Copies the day's rows into a temporary spreadsheet and exports it as .xlsx.
function buildXlsx_(header, rows, today) {
  const temp = SpreadsheetApp.create(`CDOE enquiries ${today}`)
  try {
    const sh = temp.getSheets()[0]
    sh.setName('Enquiries')
    sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold')
    sh.getRange(2, 1, rows.length, header.length).setValues(rows.map(asText_))
    sh.setFrozenRows(1)
    sh.autoResizeColumns(1, header.length)
    SpreadsheetApp.flush()

    const url = `https://docs.google.com/spreadsheets/d/${temp.getId()}/export?format=xlsx`
    const blob = UrlFetchApp.fetch(url, {
      headers: { Authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
    }).getBlob()
    return blob.setName(`CDOE-enquiries-${today.replace(/[^A-Za-z0-9]+/g, '-')}.xlsx`)
  } finally {
    DriveApp.getFileById(temp.getId()).setTrashed(true)
  }
}
