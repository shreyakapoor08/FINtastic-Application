const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const userAuth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided' });

    try {
        let parts= token.split(' ');
        let newToken = parts[1];
        const decoded = jwt.verify(newToken, process.env.JWT_ACCESS_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = userAuth;
