const jwt = require("jsonwebtoken");


module.exports = function authenticateToken(req, res, next) {
    const token = req.cookies.authentication;

    if (token == null) return res.status(401).send("Access Denied.")

    jwt.verify(token, process.env.SECRET_TOKEN, (err, id) => {

        if (err) {
            return res.status(403).send("Invalid Token Bitch!")
        }
        req.id = id;
        next()

        })
}

