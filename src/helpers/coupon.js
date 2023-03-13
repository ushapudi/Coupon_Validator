/**
 * @description Generate random strings
 * @returns {String} str
 */
export const generateString = () => {
  let str = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return str;
};

/**
 * @param {Date} endDate
 * @returns {String} minutes
 */
export const getTimeDiff = (endDate) => {
  const d1 = new Date(endDate);
  const d2 = new Date();
  const diff = d1.getTime() - d2.getTime();
  const diffInMinutes = diff / (60 * 1000);

  return Math.abs(Math.round(diffInMinutes));
};

/**
 * @description Discount Calculator
 */
export const discountCalculator = {

  /**
   * @param {Number} discount
   * @param {Number} price
   * @returns {Number} amount
   */
  flat(discount, price) {
    return price - discount;
  },

  /**
   * @param {Number} percent
   * @param {Number} price
   * @returns {Number} amount
   */
  percent(percent, price) {
    return price - ((percent / 100) * price);
  }
};