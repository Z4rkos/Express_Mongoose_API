const router = require("express").Router();
const verify = require("./verifyJWT");
const User = require('../static/models/User');



router.get('/', verify, async (req, res) => {
    const user = await User.findOne({_id: req.id});
    res.send("Hello " + user.username + ", wazzup?")

})


module.exports = router;