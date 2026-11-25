/**
 * Miekesfuif - betalingen naar Google Spreadsheet.
 *
 * Plak deze code in Extensies > Apps Script van je spreadsheet en
 * publiceer als web-app (zie README.md). De kassa-pagina stuurt elke
 * betaling als JSON naar deze web-app; hier komt er een rij bij.
 */

const SHEET_NAME = "Betalingen";
const HEADERS = ["Tijdstip", "Mededeling", "Bedrag", "Betaalwijze", "Ontvangen (cash)", "Terug (cash)", "ID"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const sheet = getSheet_();
    const id = String(data.id || "");

    if (id && alreadyLogged_(sheet, id)) return text_("dubbel");

    sheet.appendRow([
      data.ts ? new Date(Number(data.ts)) : new Date(),
      safe_(data.mededeling),
      toNumber_(data.bedrag),
      safe_(data.methode),
      toNumber_(data.ontvangen),
      toNumber_(data.terug),
      id,
    ]);
    return text_("ok");
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return text_("Miekesfuif logger werkt.");
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm:ss");
    sheet.getRange("C:C").setNumberFormat("€ #,##0.00");
    sheet.getRange("E:F").setNumberFormat("€ #,##0.00");
  }
  return sheet;
}

// Zelfde betaling twee keer ontvangen (bv. na slecht netwerk)? Dan maar 1 rij.
function alreadyLogged_(sheet, id) {
  const last = sheet.getLastRow();
  if (last < 2) return false;
  const start = Math.max(2, last - 499);
  const ids = sheet.getRange(start, 7, last - start + 1, 1).getValues();
  return ids.some((row) => String(row[0]) === id);
}

function toNumber_(value) {
  if (value === "" || value === null || value === undefined) return "";
  const n = Number(value);
  return Number.isFinite(n) ? n : "";
}

// Voorkom dat tekst als formule gelezen wordt.
function safe_(value) {
  const s = String(value == null ? "" : value).slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function text_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}
