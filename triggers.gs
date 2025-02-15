/**
 * Send formulas to client's spreadsheet.
 * @param e - e.postData.contents.ssId is client's spreadsheetID.
 * @returns {object} - {formulaName: formulaAsString}
 */
function doPost(e)
{
  const payload = JSON.parse(e.postData.contents);
  const {
    ssId,
    accessKey
  } = payload;

  const sheet = ss.getSheetByName('Updater');
  const lastRow = sheet.getLastRow();
  const ssUrls = ss.getRange(`C2:C${lastRow}`).getRichTextValues();
  const clientParams = ss.getRange(`E2:F${lastRow}`).getValues();

  const index = ssUrls.findIndex(ssUrl => ssUrl[0].getLinkUrl().split('/spreadsheets/d/')[1].split('/')[0] === ssId);
  if (index === -1) {
    return ContentService.createTextOutput(JSON.stringify({ error: `Spreadsheet is not registered.\nPlease contact us.` })).setMimeType(ContentService.MimeType.JSON);
  }

  if (accessKey !== clientParams[index][1]) {
    return ContentService.createTextOutput(JSON.stringify({ error: `Access key is not valid.\nPlease contact us.` })).setMimeType(ContentService.MimeType.JSON);
  }
  const clientFunction = clientParams[index][0] ? this[clientParams[index][0]] : this['defaultX'] ;

  // get the formulas for the related ssId
  const formulas = Object.keys(formulasMap).reduce((acc, formula) => {
    const temp = 
      clientFunction()[formula]
        ? clientFunction()[formula]
        : this['defaultX']()[formula]
          ? this['defaultX']()[formula]
          : null;
    acc[formula] =
      temp
        ? temp.toString()
            .replace(/\s+/g, ' ') // Replace multiple spaces/newlines with a single space
            .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around braces, parentheses, semicolons, etc.
            .trim()
        : null;
    return acc;
  }, {});

  return ContentService.createTextOutput(JSON.stringify({formulas, formulasMap})).setMimeType(ContentService.MimeType.JSON);
}
