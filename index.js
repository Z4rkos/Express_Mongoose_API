const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

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
app.use('/test', testRoute)


// Base route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/views/index.html"))
});

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