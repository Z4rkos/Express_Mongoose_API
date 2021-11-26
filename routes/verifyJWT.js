const jwt = require("jsonwebtoken");
const User = require('../static/models/User');

module.exports = function authenticateToken(req, res, next) {
    const token = req.cookies.authentication;

    if (token == null) return res.send("Access Denied.")

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {

        if (err) {
            return res.send("Access Denied.")
        }
        req.user = user;
        next()

        })
}
/*
const getUserFromToken = (req, res) => {
    const token = req.cookies.authentication;

    if (token == null) return res.status(401).send("Access Denied.")

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, id) => {

        if (err) {
            return res.status(403).send("Invalid Token Bitch!")
        }
        try {
            const user = await User.findById(id);
            return user;
        } catch (err) {
            console.log(err)
        }
        })
}
*/
//module.exports = getUser = getUserFromToken;