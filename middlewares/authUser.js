const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hellboy123';

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(req.cookies)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing", success: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
  }
};

module.exports = authUser;



