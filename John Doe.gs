/**
 * Client: John Doe.
 * @returns {object}
 */
function johnDoe()
{
  const customFormulaOne = (a, b) => {
    // some complex calculations yielded a coefficient of 4
    coefficient = 4;
    return a + (coefficient * b);
  };

  const customFormulaTwo = () => {
    return 'John Doe formula-two';
  };

  return {
    customFormulaOne,
    customFormulaTwo
  };
}
