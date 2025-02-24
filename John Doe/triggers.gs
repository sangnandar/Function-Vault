function onOpen()
{
  const triggerIsExist = (scriptProps.getProperty('triggerIsExist') === 'true');
  
  if (!triggerIsExist) {
    ui
      .createMenu('Custom Menu')
        .addItem('Authorize spreadsheet', 'createOpenTrigger')
      .addToUi();
    showAlert(
      `This spreadsheet needs additional permissions to run properly.
      Please click "Custom Menu" → "Authorize spreadsheet" to grant the required permissions.`
    );
    return;
  }

}

/**
 * Fetch and update formulas.
 * store {formulaName: formulaAsString} pairs into docProps.
 * @param {Event} e event object.
 * @returns {void}
 */
function fetchFormulas(e)
{
  const url = VAULT_URL;
  const options = {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({
      ssId: e.source.getId(),
      accessKey: ACCESS_KEY
    })
  };

  let response = fetchData(url, options, 5);
  if (!response) {
    showAlert('Please report this incident to us.');
    return;
  }

  response = JSON.parse(response.getContentText());
  if (response.error) {
    showAlert(response.error);
    return;
  }

  const {
    formulas,
    formulasMap
  } = response;

  const newProps = formulas;

  const oldProps = docProps.getProperties();
  docProps.setProperties(newProps);

  // re-evaluate cells
  const sheetName = 'Sheet1';
  const sheet = e.source.getSheetByName(sheetName);
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      const cell = sheet.getRange(formulasMap[key]);
      const formula = cell.getFormula();
      cell.clearContent();
      SpreadsheetApp.flush();
      cell.setFormula(formula);
    }
  }

}

function createOpenTrigger()
{
  const funcName = 'fetchFormulas';
  const triggerIsExist = ScriptApp.getProjectTriggers()
    .some(trigger => trigger.getHandlerFunction() === funcName);

  if (!triggerIsExist) {
    ScriptApp.newTrigger(funcName)
      .forSpreadsheet(ss)
      .onOpen()
      .create();
  }

  scriptProps.setProperty('triggerIsExist', 'true');
}
