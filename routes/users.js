const router = require('express').Router();
const User = require('../static/models/User');
const {registerValidation, loginValidation} = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register user.
router.post('/register', async (req, res) => {
    // Validate data.
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the email is in the database.
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send("Email " + req.body.email + " is already registered.");

    // Check if the username is in the database.
    const usernameExists = await User.findOne({username: req.body.username});
    if (usernameExists) return res.status(400).send("Username " + req.body.username + " is already registered.");

    // Hash Password.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user.
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        res.json({user: newUser._id});
    
    } catch (err) {
        res.json(err)
    }
});

router.post('/login', async (req, res) => {
    // Validate data.
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Find user in database by email and compare the given password to the one in the database.
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.send("Invalid email or password.");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password.");

        const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN, { expiresIn: '1200s'});
        res.json(token);



        //res.send("Logged in as " + user.username + ".")
    }
    catch (err) {
        console.log(err);
    }
});

// Get all users. Mainly for testing.
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json(err);
    }
});

// Get one user. Also mainly for testing, but might be usefull.
router.get('/:username', async (req, res) => {
    try {
        const oneUser = await User.findOne({username: req.params.username});
        res.json(oneUser);
    } catch (err) {
        res.json(err);
    }
})

// Delete a user based on username.
router.delete("/remove/:username", async (req, res) => {
    try {
        const removedUser = await User.remove({username: req.params.username});
        res.json(removedUser);
    } catch (err) {
        res.json(err);
    }
})



module.exports = router;