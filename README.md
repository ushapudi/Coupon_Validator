<!-- @format -->

# Coupon Validator

[![Coverage Status](https://coveralls.io/repos/github/fegoworks/coupon-validator/badge.svg?branch=develop)](https://coveralls.io/github/fegoworks/coupon-validator?branch=develop)
[![Build Status](https://travis-ci.org/fegoworks/coupon-validator.svg?branch=develop)](https://travis-ci.org/fegoworks/coupon-validator)

An API to generate and validate coupon codes

# Table of Contents

- [Technology Stack](#tstack)
- [Features](#features)
- [Getting Started](#started)
- [Pre-requisites](#require)
- [Installation](#installation)
- [Running tests](#tests)
- [API Endpoints](#endpoints)

## Technology Stack<a name="tstack"></a>

- Nodejs
- PostgreSQL
- Sequelize

## Features<a name="features"></a>

- Users can
  - Sign up
  - Sign in
  - Generate coupons
  - Validate coupons

## Getting Started<a name="started"></a>

To run this API locally simply follow the instructions below:

#### Prerequisites<a name="require"></a>

You need to have or install the following:

1. Git bash
2. Npm
3. Postman

#### Installation<a name="installation"></a>

- clone repo
  ```
  git clone https://github.com/fegoworks/coupon-validator.git
  ```
- navigate to api folder
- run installation
  ```
  npm install
  ```
- create a `.env` file with this template

  ```
  DATABASE_URL_DEVELOPMENT='Your postgres development database url'
  DATABASE_URL_TEST='Your postgres test database url'
  DATABASE_URL= 'Your postgres production url'
  SECRET = 'Your secret phrase'
  ```

- start app
  ```
  npm run start:dev
  ```
- you can now make requests using postman to `localhost:3000/api/v1/`

## Running Tests<a name="tests"></a>

To run tests simply run the following command in your git bash or command line

```
npm run test
```

### API endpoints

Heroku: [Coupon-API](https://coupons-fe.herokuapp.com/)
Documentation: [Coupon-API-Docs]()

| Endpoints              | Functionality                      |
| ---------------------- | ---------------------------------- |
| POST /auth/create-user | Create new user account            |
| POST /auth/signin      | Login a user                       |
| POST /coupons/generate | Generate a coupon code             |
| POST /coupons/validate | Validate coupon code               |
| GET /coupons/          | View all coupon codes              |
| GET /coupons/flat      | View flat discount coupon codes    |
| GET /coupons/percent   | View percent discount coupon codes |

### Sign up<a name="endpoints"></a>

Send a `POST` request to `/api/v1/auth/create-user` with the following JSON structure:

```json
{
  "firstName": "Sensei",
  "lastName": "Saitama",
  "email": "saitama@mail.com",
  "password": "password"
}
```

`POST` requests are restricted to only registered accounts.

### Sign in with the user

Send a `POST` request to `/api/v1/auth/signin`, with the following:

```json
{
	"email": ,
	"password":
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send any request related to coupons.

> Frow now on, every request described here will require you send
> the Bearer token

### Generate a flat coupon code

Send a `POST` request to `/api/v1/coupons/generate`, with the following:

```json
{
  "discount": 400.0,
  "minimumAmount": 200.0,
  "maximumAmount": 0,
  "discountType": "flat",
  "expiryDate": "June 27, 2020 15:45:00"
}
```

The above will generate a flat discount coupon

> The `discount` field for a flat discount should be a distinct amount like this`"500.00"`
> The `maximumAmount` field is only necessary when generating a coupon that has a percent discount, so for
> flat discounts we can set this field to `0`

> The `expiryDate` field will accept JavaScript Date strings in the following formats
> `MM/DD/YYYY` or DateTime formats like `June 27, 2020 15:45:00`

###### See how to generate a percent discount coupon below:

```json
{
  "discount": 40,
  "minimumAmount": 0,
  "maximumAmount": 10000.0,
  "discountType": "percent",
  "expiryDate": "June 27, 2020 15:45:00"
}
```

> Note that unlike the flat discount coupons, the `discount` field for percent discount coupons accepts an
> integer. And the `minimumAccount` field can be set to `0`

### Validate Coupons

Send a `POST` request to `/api/v1/coupons/validate`, with the following:

```json
{
  "coupon": "wwXGgh",
  "cartPrice": 5000.0
}
```

### View Coupons

Send a `GET` request to `/api/v1/coupons`

### View Coupons by discount type

Send a `GET` request to `/api/v1/coupons/flat` or `/api/v1/coupons/percent`

## Author

Edafe Oghenefego
[@realFego](https://twitter.com/realFego)
