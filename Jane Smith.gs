/**
 * Client: Jane Smith.
 * @returns {object}
 */
function janeSmith()
{
  const customFormulaOne = (a, b) => {
    // some complex calculations yielded a coefficient of 3
    const coefficient = 3;
    return a + (coefficient * b);
  };

  const customFormulaThree = () => {
    return 'Jane Smith formula-three';
  };

  return {
    customFormulaOne,
    customFormulaThree
  };
}
