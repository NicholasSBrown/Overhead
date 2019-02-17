let express = require('express')
let app = express()
let passport = require('passport')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
let FileStore = require('session-file-store')(session)

// Set view engine to EJS
app.set('view engine', 'ejs')



// view engine setup

app.set('view engine', 'ejs');

// Set /public/ for 'frontend' files
app.use(express.static('public'))

// Configure body parser (gives req.body from form submits)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



// add footer and header partials
const partialsDir = __dirname + '/views/partials/'
app.use(function (req, res, next) {
    let _render = res.render
    res.render = function (view, options, fn) {
        options = {
            title: 'Site Name',
            ...options,
            footer: partialsDir + 'footer',
            header: partialsDir + 'header',
            loggedIn: req.isAuthenticated()
        }
        _render.call(this, view, options, fn)
    }
    return next()
})

// Routing
app.use(require('./routes/index.js'))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
