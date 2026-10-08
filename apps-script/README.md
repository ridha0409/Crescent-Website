# Daily enquiry digest — setup

Each **Enquire Now** enquiry is handled two ways, both by this one script:

1. **Straight away:** it is emailed to the support inbox on its own. Replying
   to that email replies to the person who enquired.
2. **End of day:** it is also saved as a row in a Google Sheet. Every night
   between 11 PM and midnight, one email goes to the support inbox with all of
   that day's enquiries.

Both emails are sent from the Google account you set the script up with, so
nothing needs activating. Once the script is connected, the website stops
using FormSubmit and its "Activate Form" step. FormSubmit is only used as a
backup if the script can't be reached. The enquiries appear as a table in the email
body and as an Excel (.xlsx) attachment.

You set this up once. It takes about 10 minutes and needs the Google account
that should own the sheet (ideally the CDOE office account).

## 1. Create the sheet and the script

1. Go to <https://sheets.google.com> and create a blank sheet. Name it
   **CDOE Website Enquiries**.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code, paste in the whole of `EnquiryDigest.gs` from this
   folder, and click **Save**.
4. At the top of the script, check these settings:
   - `DIGEST_TO`: the inbox that receives the daily email. To send it to more
     than one address, separate them with commas.
   - `DIGEST_HOUR`: the hour the end-of-day email is sent, from 0 to 23. The
     default is **23**, so it arrives between 11 PM and midnight. On a day with
     no enquiries, the email says "no new enquiries".
   - `DIGEST_EVERY_MINUTES`: leave this at `0` for one email a day. For
     testing, you can set it to 1, 5, 10, 15 or 30 to get the summary that
     often. In that mode, no email is sent when nothing new has arrived.

   If you change either setting later, run **setupDailyTrigger** again so
   the new schedule takes effect.
5. Click the **⚙ Project Settings** icon and set **Time zone** to
   **(GMT+05:30) India Standard Time**.

## 2. Turn on the daily email

1. In the function drop-down next to **Run**, choose **setupDailyTrigger**,
   then click **Run**.
2. Google asks for permissions: the sheet, sending email, Drive (used to build
   the Excel file) and external requests. Approve them.
   If you see "Google hasn't verified this app", click **Advanced →
   Go to (project name)**. This warning is normal for your own scripts.

A tab named **Enquiries** with a header row now appears in the sheet.

## 3. Publish the endpoint the website posts to

1. Click **Deploy → New deployment**, then the ⚙ next to "Select type", then
   **Web app**.
2. Set **Execute as** to **Me**, and **Who has access** to **Anyone**.
3. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

## 4. Connect the website

1. In the project folder (next to `package.json`), create a file named `.env`
   containing:

   ```
   VITE_ENQUIRY_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

2. Restart `npm run dev`, then rebuild and redeploy the site.

   Commit `.env` with the rest of the code. The GitHub Pages workflow builds the
   site from the repository, so it only sees the URL if `.env` is committed.
   The URL is not a secret: it ends up in the public JavaScript bundle anyway,
   and the script only accepts new enquiries. It cannot be used to read the
   sheet.

Until this URL is set, enquiries go through FormSubmit instead. FormSubmit
delivers nothing until someone clicks the "Activate Form" email it sends to
`cdoesupport@crescent.education`. Nothing is saved to the sheet and no
end-of-day email goes out.

## Testing

- Submit a test enquiry on the website. Within a few seconds a new row should
  appear in the sheet and a "New enquiry from …" email should reach the
  support inbox. Check the spam folder the first time.
- In Apps Script, choose **sendDailyDigest** and click **Run**. The digest
  email should arrive with the table and the .xlsx attachment.
  Running it by hand counts as a digest, so the next scheduled email starts
  from that point.

## Notes

- The sheet keeps every enquiry permanently, so it is also your full history.
  You can download it at any time with **File → Download → Microsoft Excel**.
- If you edit the script later, publish the change with **Deploy → Manage
  deployments → Edit → Version: New version**. Otherwise the website keeps
  using the old code.
- On a day with no enquiries, the email still arrives and says
  "no new enquiries".
