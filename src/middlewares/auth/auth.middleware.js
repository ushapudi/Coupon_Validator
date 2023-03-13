/* eslint-disable operator-linebreak */
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const verifyToken = {
  verify(req, res, next) {
    if (req.headers.authorization === undefined) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided. ',
      });
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Failed to authenticate token',
        });
      }
      // If everything is good, save to request for use in other routes
      req.id = decoded.id;
      return next();
    });
  },
};

export default verifyToken;