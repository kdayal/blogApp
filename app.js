require('dotenv').config();
const path = require('path');

const express = require('express');

const blogRoutes = require('./routes/blog.js');
const categoryRoutes = require('./routes/category.js');

const app = express();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static('public')); // Serve static files (e.g. CSS files)

// express middleware
app.use(blogRoutes);
app.use(categoryRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

//app.listen(3000, 'App running on port 3000');

const PORT = 3000;
 
app.listen(PORT, function(err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
