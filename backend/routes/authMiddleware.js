

//importing JSON Web Tokens (jwts) - for authentication and authorization
const jwt = require('jsonwebtoken');

const config = require('config');

//Authentication Middleware
function authenticateToken(req, res, next) 
{
    const token = req.header('x-auth-token');
    if (!token) 
    {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
}




module.exports = router;