require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // get token from header
    const token = req.header["x-auth-token"];

    // if not token found
    if (!token) {
        return res
            .status(401)
            .json({ message: "No token, authorization denied" });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
