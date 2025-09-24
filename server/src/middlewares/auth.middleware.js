const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeaders = req.headers["authorization"]
    if (!authHeaders) return res.status(401).send("no token")

    const token = authHeaders.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next()
    } catch {
        res.status(403).send("Invalid token")
    }
}
// middleware/authorizeRoles.js
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: `Forbidden: Insufficient role ${req.user.role}` });
      }
      next();
    };
  }
  
  module.exports = authorizeRoles;
  

module.exports = {authMiddleware, authorizeRoles}