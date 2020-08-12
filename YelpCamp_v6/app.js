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

seedDB();

app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp_6");
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



app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing")
});


app.get("/campground",function(req,res){
    // console.log(req.user);
    
    Campground.find({},function(err,all_campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campground",{campgrounds:all_campgrounds});
        }
    });
});

app.post("/campground",function(req,res){
    // res.send("you hit the post rout");
    var name=req.body.name;
    var img=req.body.image;
    var dec=req.body.description;
    var newCampGround={name:name,image:img, description:dec};
    // campgrounds.push(newCampGround);
    //Now we will be adding data to the database..
    Campground.create(newCampGround, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    });
});

app.get("/campground/new",function(req,res){
    res.render("campgrounds/new");
});

app.get("/campground/:id", function(req,res){
    // res.send("This will be show page after some time"); 
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            // res.render("campground",{campgrounds:all_campgrounds});
            
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
    
});
//###########################
// COMMENTS ROUTS
//###########################

app.get("/campground/:id/comment/new", isLoggedIn ,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    });
});

app.post("/campground/:id/comment",isLoggedIn ,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground");    
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/"+campground._id);
                }
            });
        }
    });
});

//#################
// Auth Routes
//#################
app.get("/register",function(req,res){
    res.render("register");
})

//Handle Sign UP logic
app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
    res.render("login");
});
//Handling login logic
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    }),function(req,res){
    
});
//logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




app.get("*",function(req,res){
    res.send("you entered wrong ip");
});
app.listen(3000,function(){
    console.log("server has started")
    console.log("don't forget to kill the port using fuser -k 3000/tcp");
    
});