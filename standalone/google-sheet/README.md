# Send website enquiries to a Google Sheet

The enquiry form on the website sends each submission to a small Google Apps Script,
which adds it as a new row in your Google Sheet (and can email you a copy). It is free
and needs no server. Set-up takes about five minutes.

## 1. Create the Sheet and add the script

1. Create a new Google Sheet (for example "Krishna Builder Enquiries").
2. Menu **Extensions → Apps Script**.
3. Delete the sample code, then paste in everything from [`Code.gs`](./Code.gs).
4. At the top of the script you can change:
   - `NOTIFY_TO`: where a copy of each enquiry is emailed (`""` to turn emails off)
   - `TENDER_CC`: also emailed for "Tender / bid enquiry" (`""` to turn off)
   - `SHEET_NAME`: the tab the rows go into (created automatically)
5. Click **Save**.

## 2. Deploy it as a Web app

1. **Deploy → New deployment**, click the gear icon, choose **Web app**.
2. Set **Execute as: Me** and **Who has access: Anyone**.
3. Click **Deploy** and approve the permissions Google asks for (it needs to edit
   the Sheet, and to send email if `NOTIFY_TO` is set).
   If you see "Google hasn't verified this app", choose **Advanced → Go to … (unsafe)**.
   This is normal for your own script.
4. Copy the **Web app URL** (it ends in `/exec`).
5. Paste that URL into a browser. You should see
   `Krishna Builder enquiry endpoint is live.`

## 3. Connect the website

Pick one:

- **Rebuild with the URL** (recommended). From the `standalone` folder:

  ```
  # Windows PowerShell
  $env:ENQUIRY_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec"; node build.mjs

  # macOS / Linux / Git Bash
  ENQUIRY_ENDPOINT="https://script.google.com/macros/s/XXXX/exec" node build.mjs
  ```

- **Or edit the file directly:** open `krishna-builder.html` in a text editor, search for
  `var ENQUIRY_ENDPOINT =` and put the URL between the quotes.

Then open the page, send a test enquiry, and check that a row appears in the Sheet.

While `ENQUIRY_ENDPOINT` is empty the form falls back to opening the visitor's email
app with the enquiry filled in, so nothing is silently lost.

## Good to know

- **Changing the script later:** use **Deploy → Manage deployments → ✎ Edit → Version: New
  version → Deploy**. The URL stays the same. (A brand-new deployment creates a new URL.)
- **Spam protection:** the URL is visible to anyone who views the page source, so the script
  protects itself: it ignores submissions where the hidden "website" field is filled or that
  arrive impossibly fast, re-checks every field, and limits field lengths. Genuine
  visitors are not affected.
- **Free limits:** Google lets a consumer account send about 100 emails a day through Apps
  Script. Rows added to the Sheet are not limited by this.
- **If the form shows "Network error":** confirm the deployment's access is **Anyone**
  (not "Anyone with a Google account") and that the URL ends in `/exec`, not `/dev`.
- **Columns:** Timestamp · Name · Email · Phone · Organisation · Subject · Message · Source.
  Cells beginning with `=`, `+`, `-` or `@` are stored as plain text so nobody can inject a
  spreadsheet formula.
