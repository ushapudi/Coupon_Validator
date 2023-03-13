/**
 * /* eslint-disable indent
 *
 * @format
 */

import {
  Coupon
} from '../models';
import {
  decodeToken,
  generateToken,
  handleErrorResponse,
  handleSuccessResponse,
} from '../helpers/utils';
import {
  getTimeDiff,
  generateString,
  discountCalculator,
} from '../helpers/coupon';

/**
 * @description Coupon Controller
 * @class CouponController
 */
class CouponController {
  /**
   * @description Generate Coupon Code
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Coupon
   * @member CouponController
   */
  static async createCoupon(req, res) {
    try {
      const {
        minimumAmount,
        maximumAmount,
        discountType,
        discount,
        expiryDate,
      } = req.body;

      const userId = req.id;
      const timeDiff = getTimeDiff(expiryDate);
      const coupon = generateString();
      const couponToken = generateToken({
          coupon,
        },
        `${timeDiff}m`,
        process.env.SECRET);

      const newCoupon = await Coupon.create({
        userId,
        coupon,
        couponToken,
        minimumAmount,
        maximumAmount,
        discountType,
        discount,
        expiryDate,
      });
      return handleSuccessResponse(res, newCoupon, 201);
    } catch (e) {
      if (e.name.startsWith('Sequelize') && e.errors.length) {
        const error = e.errors.shift();
        return handleErrorResponse(res, error.message, 400);
      }
      return handleErrorResponse(res, e.message, 500);
    }
  }

  /**
   * @description Validate Coupon
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Coupon
   * @member CouponController
   */
  static async validateCoupon(req, res) {
    try {
      let amount = 0;
      const {
        coupon,
        cartPrice
      } = req.body;

      const found = await Coupon.findOne({
        where: {
          coupon,
        },
      });

      if (found === null || found.length === 0) {
        return handleErrorResponse(res, 'Coupon does not exist', 404);
      }
      const decoded = decodeToken(found.couponToken);

      if (decoded) {
        if (found.discountType === 'flat') {
          if (cartPrice < found.minimumAmount) {
            return handleErrorResponse(
              res,
              "Cart price is lower than coupon's limit",
              403
            );
          }
          amount = discountCalculator.flat(found.discount, cartPrice);
        } else {
          if (cartPrice > found.maximumAmount) {
            return handleErrorResponse(
              res,
              "Cart price exceeds coupon's limit ",
              403
            );
          }
          amount = discountCalculator.percent(found.discount, cartPrice);
        }
        return handleSuccessResponse(
          res, {
            status: 'coupon code is valid',
            discountAmount: cartPrice - amount,
            newCartPrice: amount,
          },
          200
        );
      }
    } catch (error) {
      if (error.message === 'jwt expired') {
        return handleErrorResponse(res, 'Coupon code is no longer valid', 401);
      }
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Get all Coupons
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Coupons
   * @member CouponController
   */
  static async getCoupons(req, res) {
    try {
      const coupons = await Coupon.findAll();
      return handleSuccessResponse(res, coupons);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }

  /**
   * @description Get By Type
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} Coupons
   * @member CouponController
   */
  static async getCouponsByType(req, res) {
    try {
      let discountType;
      if (req.path.includes('flat')) {
        discountType = 'flat';
      }
      if (req.path.includes('percent')) {
        discountType = 'percent';
      }
      const coupons = await Coupon.findAll({
        where: {
          discountType
        }
      });
      return handleSuccessResponse(res, coupons);
    } catch (error) {
      return handleErrorResponse(res, error.message, 500);
    }
  }
}

export default CouponController;