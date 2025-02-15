/**
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 */

var ui; // return null if called from script editor
try {
  ui = SpreadsheetApp.getUi();
} catch (e) {
  Logger.log('You are using script editor.');
}

const ss = SpreadsheetApp.getActiveSpreadsheet();

const formulasMap = {
  customFormulaOne: 'A7',
  customFormulaTwo: 'A8',
  customFormulaThree: 'A9'
};
