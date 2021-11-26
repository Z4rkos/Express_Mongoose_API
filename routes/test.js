const router = require("express").Router();
const verify = require("./verifyJWT");
const User = require('../static/models/User');



router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findById({_id: req.user._id});
        res.json(user)
    } catch (err) {
        console.log(err)
        res.json("Something went wrong")
    }
    
    
})


module.exports = router;