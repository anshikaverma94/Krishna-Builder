/**
 * Krishna Builder — website enquiry form  ->  Google Sheet
 *
 * Paste this whole file into the Apps Script editor of the Google Sheet that
 * should receive the enquiries (Extensions > Apps Script), then deploy it as a
 * Web app. Step-by-step instructions are in README.md next to this file.
 */

// ---- settings you may want to change ---------------------------------------
var SHEET_NAME = "Enquiries";                       // tab that rows are added to (created if missing)
var NOTIFY_TO = "info@krishnabuilder.co.in";        // email a copy of each enquiry here; "" = don't email
var TENDER_CC = "tendercell@krishnabuilder.co.in";  // also emailed for "Tender / bid enquiry"; "" = don't
var TIMEZONE = "Asia/Kolkata";
var MIN_FILL_MS = 1500;                              // submissions faster than this are treated as bots
// -----------------------------------------------------------------------------

var HEADERS = ["Timestamp", "Name", "Email", "Phone", "Organisation", "Subject", "Message", "Source"];
var SUBJECTS = ["General enquiry", "Tender / bid enquiry", "Project enquiry", "Other"];
var EMAIL_RE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var PHONE_RE = /^[+\d][\d\s-]{6,18}$/;

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) return reply_({ error: "Invalid request." });

    var d;
    try { d = JSON.parse(raw); } catch (err) { return reply_({ error: "Invalid request." }); }

    // Bots: the hidden "website" field is filled, or the form was submitted impossibly fast.
    // Answer "ok" so the bot learns nothing, but store nothing.
    if (d.website) return reply_({ ok: true });
    if (typeof d.elapsed === "number" && d.elapsed < MIN_FILL_MS) return reply_({ ok: true });

    var v = clean_(d);
    var problem = validate_(v);
    if (problem) return reply_({ error: problem });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000); // several people submitting at once: take turns
    try {
      var sheet = getSheet_();
      sheet.appendRow([
        Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
        safe_(v.name), safe_(v.email), safe_(v.phone), safe_(v.organisation),
        safe_(v.subject), safe_(v.message), safe_(v.source),
      ]);
    } finally {
      lock.releaseLock();
    }

    notify_(v); // a mail problem must never lose the enquiry that is already saved
    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ error: "We couldn't save your message right now. Please email " + (NOTIFY_TO || "us") + " or call us." });
  }
}

// Opening the web-app URL in a browser shows this, handy to confirm the deployment is live.
function doGet() {
  return ContentService.createTextOutput("Krishna Builder enquiry endpoint is live.");
}

function clean_(d) {
  function s(x, max) { return String(x == null ? "" : x).trim().slice(0, max); }
  return {
    name: s(d.name, 100), email: s(d.email, 200), phone: s(d.phone, 20),
    organisation: s(d.organisation, 150), subject: s(d.subject, 40),
    message: s(d.message, 3000), source: s(d.source, 140) || "Website enquiry form",
  };
}

// Same rules as the website form, enforced again here because anyone can call this URL directly.
function validate_(v) {
  if (v.name.length < 2) return "Please check the form and try again.";
  if (!EMAIL_RE.test(v.email)) return "Please check the form and try again.";
  if (v.phone && !PHONE_RE.test(v.phone)) return "Please check the form and try again.";
  if (SUBJECTS.indexOf(v.subject) === -1) return "Please check the form and try again.";
  if (v.message.length < 10) return "Please check the form and try again.";
  return "";
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#4a2370").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(7, 420);
  }
  return sheet;
}

// A cell that starts with = + - @ would run as a formula (spreadsheet injection). Prefix it so it stays text.
function safe_(x) {
  var t = String(x);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

function notify_(v) {
  if (!NOTIFY_TO) return;
  try {
    var to = [NOTIFY_TO];
    if (TENDER_CC && v.subject === "Tender / bid enquiry") to.push(TENDER_CC);
    MailApp.sendEmail({
      to: to.join(","),
      replyTo: v.email,
      subject: "[Website] " + v.subject + " — " + v.name,
      body:
        "New website enquiry\n\n" +
        "Name: " + v.name + "\nEmail: " + v.email + "\nPhone: " + (v.phone || "—") +
        "\nOrganisation: " + (v.organisation || "—") + "\nSubject: " + v.subject + "\n\n" + v.message,
    });
  } catch (err) {
    console.error("Notification email failed: " + err);
  }
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
