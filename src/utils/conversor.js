/**
 * @param {string} date - A date, using numerical US pattern (i.e. "2014-08-22")
 * @returns {string} - A converted date "stringfied" (i.e. "August 22, 2014")
 */
export function convertDate(date) {

  /* need to convert the date to use slash ("/") instead of hyphen ("-")
   * because the js Date API have some struggles doing its job using the hyphen notation */
  const dateUsingSlashes = date.replace('-', '/');
  const objDate = new Date(dateUsingSlashes);
  const locale = 'en-us';

  return objDate.toLocaleString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * use the convertMoney.format(number) to obtain the result below
 * @param {number} - A regular number (i.e. 10000)
 * @returns {string} - A converted number formatted as money (i.e. "$10.000")
 */
export const convertMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});
