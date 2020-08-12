var bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    flash              = require("connect-flash");
    passport           = require("passport"),
    LocalStrategy      = require("passport-local"),
    methodOverride     = require("method-override"),
    express            = require("express"),
    app                = express(),
    Campground         = require("./models/campground"),
    Comment            = require("./models/comment"),
    User               = require("./models/user"),
    seedDB             = require("./seeds");


var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// seedDB(); //seed the database..

app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp_9");
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
    secret: "Once again rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use("/",indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);



app.set("view engine","ejs");


app.get("*",function(req,res){
    res.send("you entered wrong ip");
});
app.listen(3000,function(){
    console.log("server has started")
    console.log("don't forget to kill the port using fuser -k 3000/tcp");
    
});