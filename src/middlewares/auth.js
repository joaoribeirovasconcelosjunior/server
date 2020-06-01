const jwt = require('jsonwebtoken');

const jwtSecret = 'SECRET';
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'token invalid ERROR' });
    }
    req.userID = decoded.ID;

    return next();
  });
};
