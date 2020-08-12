var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
router.get("/",function(req,res){
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

router.post("/",function(req,res){
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

router.get("/new",function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req,res){
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

module.exports  = router;