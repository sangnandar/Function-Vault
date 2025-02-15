/**
 * Default formulas.
 * If a formula is not defined in client's function, it means the client uses default formula from this function.
 * Using `defaultX` because `default` is a reserved word and 
 * `default_` has another meaning (private function) in Apps Script.
 * @returns {object}
 */
function defaultX()
{
  const customFormulaOne = (a, b) => {
    return a + b;
  };

  const customFormulaTwo = () => {
    return 'Default formula-two';
  };

  const customFormulaThree = () => {
    return 'Default formula-three';
  };

  return {
    customFormulaOne,
    customFormulaTwo,
    customFormulaThree
  };
}
