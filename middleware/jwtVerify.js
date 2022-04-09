const jwt = require("jsonwebtoken");
const {StatusCodes} = require('http-status-codes');

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.FORBIDDEN).send("Invalid user");
            }
            req.user = user;
            next();
        });
    } catch (e) {
        next(e);
    }
};