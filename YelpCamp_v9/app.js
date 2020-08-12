var bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    passport           = require("passport"),
    LocalStrategy      = require("passport-local"),
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

//Passport configuration
app.use(require("express-session")({
    secret: "Once again rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
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