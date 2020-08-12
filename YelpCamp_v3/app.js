var bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    express            = require("express"),
    app                = express(),
    Campground         = require("./models/campground"),
    seedDB             = require("./seeds");

// seedDB();

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));



app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing")
});


app.get("/campground",function(req,res){

    Campground.find({},function(err,all_campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground",{campgrounds:all_campgrounds});
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
    res.render("new");
});

app.get("/campground/:id", function(req,res){
    // res.send("This will be show page after some time"); 
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            // res.render("campground",{campgrounds:all_campgrounds});
            
            res.render("show",{campground: foundCampground});
        }
    });
    
});





app.get("*",function(req,res){
    res.send("you entered wrong ip");
});
app.listen(3000,function(){
    console.log("server has started")
    console.log("don't forget to kill the port using fuser -k 3000/tcp");
    
});