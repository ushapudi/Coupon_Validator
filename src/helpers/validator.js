import Joi from '@hapi/joi';

const validator = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[a-zA-Z]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('First Name is required')),
      lastName: Joi.string()
        .regex(/^[a-zA-Z\\-]*$/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('Last Name is required')),
      email: Joi.string()
        .email()
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string()
        .regex(/\S+@\S+\.\S+/)
        .required()
        .trim()
        .lowercase()
        .error(new Error('A valid email address is required')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required')),
    }),
    generateCouponSchema: Joi.object().keys({
      minimumAmount: Joi.number()
        .required()
        .error(new Error('Please input minimum cart amount')),
      maximumAmount: Joi.number()
        .required()
        .error(new Error('Please input a maximum cart amount')),
      discountType: Joi.string()
        .required()
        .trim()
        .lowercase()
        .valid('flat', 'percent')
        .error(new Error('Value must either be flat or percent')),
      discount: Joi.number()
        .required()
        .error(new Error('Please specify discount amount or percent')),
      expiryDate: Joi.date()
        .required()
        .error(new Error('Please input a valid expiry date'))
    }),
    validateCouponSchema: Joi.object().keys({
      coupon: Joi.string()
        .required()
        .error(new Error('Please enter coupon code')),
      cartPrice: Joi.number()
        .required()
        .error(new Error('Enter cart price'))
    })
  },
};

export default validator;