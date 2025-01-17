var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
    res.render("landing")
});




//#################
// Auth Routes
//#################
router.get("/register",function(req,res){
    res.render("register");
})

//Handle Sign UP logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campground");
        });
    });
});
//Show login form
router.get("/login",function(req,res){
    res.render("login");
});
//Handling login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    }),function(req,res){
    
});
//logout route
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports  = router;


