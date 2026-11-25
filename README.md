# Miekesfuif kassa

Betaalpagina voor Mieke's fuif: https://gertjandb.github.io/Miekesfuif/

- **Bonnen**: blauwe bonnen (1–5) tellen €2,50 per bon bij het bedrag, rode bonnen (1–5) €3,75 per bon.
- **− / +** passen het bedrag aan per €1,25, **€15** telt €15 bij, **reset** zet het bedrag op nul.
- **Mededeling**: start op *Miekesfuif 1* en telt na elke betaling op (*Miekesfuif 2*, *3*, …).
  Druk **5 keer snel na elkaar op reset** om de teller terug op *Miekesfuif 1* te zetten.
- **Overschrijving / Cash**: bij *Overschrijving* scant de klant de QR-code. Bij *Cash* verdwijnt de QR-code,
  zie je wat je moet ontvangen, vul je in wat de klant geeft en zie je meteen wat je terug moet geven.
- **Betaald**: de betaling wordt (als de Google Spreadsheet ingesteld is) op de lijst gezet:
  tijdstip, mededeling, bedrag, betaalwijze, ontvangen en terug. Zonder internet wacht de betaling op de
  telefoon en wordt ze later automatisch verstuurd.

## Google Spreadsheet instellen

1. Maak een nieuwe Google Spreadsheet (bv. *Miekesfuif betalingen*).
2. Kies in het menu **Extensies → Apps Script**.
3. Verwijder de voorbeeldcode en plak de inhoud van [`google-apps-script/Code.gs`](google-apps-script/Code.gs). Klik op **Opslaan**.
4. Klik rechtsboven op **Implementeren → Nieuwe implementatie**. Kies bij het tandwiel **Web-app**.
   - *Uitvoeren als*: **Ik**
   - *Wie heeft toegang*: **Iedereen**
5. Klik **Implementeren**, geef toestemming met je Google-account (bij "Google heeft deze app niet geverifieerd": **Geavanceerd → Ga naar … (onveilig)**; het is je eigen script).
6. Kopieer de **URL van de web-app** (eindigt op `/exec`).
7. Plak die URL in `index.html` bij `const SHEET_URL = "";` (bovenaan het script, onder *INSTELLING*), commit en push.
8. Test: open de pagina, kies een bon en druk **Betaald**. In de spreadsheet verschijnt een tabblad **Betalingen** met een kopregel en je betaling.

Pas je later `Code.gs` aan? Kies dan **Implementeren → Implementaties beheren → bewerken → Nieuwe versie**, zodat de URL hetzelfde blijft.
