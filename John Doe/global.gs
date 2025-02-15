/**
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 */

var ui;
try {
  ui = SpreadsheetApp.getUi();
} catch (e) {
  Logger.log('You are using script editor.');
}

const ss = SpreadsheetApp.getActiveSpreadsheet();
const scriptProps = PropertiesService.getScriptProperties();
const docProps = PropertiesService.getDocumentProperties();

const {
  VAULT_URL,
  ACCESS_KEY
} = scriptProps.getProperties();

/**
 * Wrapper to handle formula retrieval and invocation.
 * @param {Function} formulaFn The formula function to execute.
 * @param {...any} args Arguments to pass to the formula function.
 * @returns {any} The result of the formula function or an error message.
 */
function executeCustomFormula(formulaFn, ...args)
{
  const getFormula = docProps.getProperty(formulaFn.name);
  if (!getFormula) return 'Please report this incident to us.';
  const theFormula = new Function('return ' + getFormula)();
  return theFormula(...args);
}

/**
 * @param {string} url 
 * @param {object} options 
 * @param {number} retries 
 * @returns {object|boolean}
 */
function fetchData(url, options, retries)
{
  let success = false, response;
  while (!success && retries) {
    try {
      response = UrlFetchApp.fetch(url, options);
      success = (response.getResponseCode() === 200);
    } catch (e) {
      Logger.log(`Fetch attempt failed: ${e.message}`);
    }
    if (!success) Utilities.sleep(500);
    retries --;
  }

  return success ? response : success ;
}

function showAlert(message)
{
  if (ui) {
    ui.alert(message);
  } else {
    Logger.log(message);
  }
}
