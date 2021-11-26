const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")

app.use(bodyParser.json());
app.use(cookieParser());

require('dotenv/config');


// Automatic routing of static files
app.use(express.static("static"));

// Posts routing and middleware
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute)


// Authorization routing and middleware
const authRoute = require('./routes/users');
app.use('/api/user', authRoute)


// Test route for jwt stuffs.
const testRoute = require('./routes/test');
app.use('/api/test', testRoute)


// Base route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/views/index.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/views/login.html"))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/views/register.html"))
})


// Just for testing
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/views/test.html"))
});

// Error route. Will rework this to work with more status codes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname + "/static/views/error.html"))
});



// Connect To DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => console.log("Conencted to DB."));





app.listen(8000)