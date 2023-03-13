/** @format */

import supertest from 'supertest';
import chai from 'chai';
import {
  describe,
  it
} from 'mocha';
import app from '../app';

const {
  expect
} = chai;

const server = supertest(app);

const user = {
  email: 'feggie@mail.com',
  password: 'pass',
};

// Coupon
const couponTestOne = {
  minimumAmount: 1000.0,
  maximumAmount: 0,
  discountType: 'flat',
  discount: 500.0,
  expiryDate: 'July 25, 2021 15:45:00',
};

const couponTestTwo = {
  minimumAmount: 0,
  maximumAmount: 8000.0,
  discountType: 'percent',
  discount: 50,
  expiryDate: 'July 25, 2021 15:45:00',
};

let userToken = '';
let couponOne = '';
let couponTwo = '';

// Generate Coupon
describe('generate coupon', () => {
  it('should generate flat discount coupon if a user is signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token
    } = loginResponse.body.data;
    userToken += token;
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(couponTestOne)
      .set('authorization', `Bearer ${userToken}`);
    couponOne += response.body.data.coupon;
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('generate coupon', () => {
  it('should generate percent discount coupon if a user is signed in', async () => {
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(couponTestTwo)
      .set('authorization', `Bearer ${userToken}`);
    couponTwo += response.body.data.coupon;
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('generate coupon', () => {
  it('should not generate coupon if the user is not signed in', async () => {
    const coupon = {
      minimumAmount: 0,
      maximumAmount: 5000,
      discountType: 'percent',
      discount: 50,
      expiryDate: 'July 25, 2021 15:45:00',
    };

    const response = await server
      .post('/api/v1/coupons/generate')
      .send(coupon);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('generate coupon', () => {
  it('should not generate coupon if minimum amount is empty', async () => {
    const coupon = {
      minimumAmount: '',
      maximumAmount: 0,
      discountType: 'flat',
      discount: 500.0,
      expiryDate: 'July 25, 2021 15:45:00',
    };
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Please input minimum cart amount');
  });
});

describe('generate coupon', () => {
  it('should not generate coupon if maximum amount is empty', async () => {
    const coupon = {
      minimumAmount: 670.0,
      maximumAmount: '',
      discountType: 'percent',
      discount: 500.0,
      expiryDate: 'July 25, 2021 15:45:00',
    };
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Please input a maximum cart amount');
  });
});

describe('generate coupon', () => {
  it('should not generate coupon if discount is empty', async () => {
    const coupon = {
      minimumAmount: 670.0,
      maximumAmount: 0,
      discountType: 'percent',
      discount: '',
      expiryDate: 'July 25, 2021 15:45:00',
    };
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal(
      'Please specify discount amount or percent'
    );
  });
});

describe('generate coupon', () => {
  it('should not generate coupon if expiry date is empty', async () => {
    const coupon = {
      minimumAmount: 670.0,
      maximumAmount: 0,
      discountType: 'percent',
      discount: 50,
      expiryDate: '',
    };
    const response = await server
      .post('/api/v1/coupons/generate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Please input a valid expiry date');
  });
});

// Validate coupon codes

describe('validate coupon', () => {
  it('should validate coupon code if user is signed in', async () => {
    const coupon = {
      coupon: `${couponOne}`,
      cartPrice: 5000,
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(200);
    expect(response.body.data).to.be.an('object');
  });
});

describe('validate coupon', () => {
  it('should not validate coupon code if not signed in', async () => {
    const coupon = {
      coupon: `${couponOne}`,
      cartPrice: 5000,
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('validate coupon', () => {
  it('should not validate a random string as coupon code', async () => {
    const coupon = {
      coupon: 'dghvykk',
      cartPrice: 5000,
    };

    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('Coupon does not exist');
  });
});

describe('validate coupon', () => {
  it('should not validate coupon if coupon field is empty', async () => {
    const coupon = {
      coupon: '',
      cartPrice: 5000,
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Please enter coupon code');
  });
});

describe('validate coupon', () => {
  it('should not validate coupon if cart price field is empty', async () => {
    const coupon = {
      coupon: `${couponOne}`,
      cartPrice: '',
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Enter cart price');
  });
});

describe('validate coupon', () => {
  it('should not validate coupon if cart price is lower than minimum', async () => {
    const coupon = {
      coupon: `${couponOne}`,
      cartPrice: 600.00,
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal("Cart price is lower than coupon's limit");
  });
});

describe('validate coupon', () => {
  it('should not validate coupon if cart price is higher than maximum', async () => {
    const coupon = {
      coupon: `${couponTwo}`,
      cartPrice: 100000.00,
    };
    const response = await server
      .post('/api/v1/coupons/validate')
      .send(coupon)
      .set('authorization', `Bearer ${userToken}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal("Cart price exceeds coupon's limit ");
  });
});