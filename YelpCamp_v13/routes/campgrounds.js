var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


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

router.post("/",middleware.isLoggedIn,function(req,res){
    // res.send("you hit the post rout");
    var name=req.body.name;
    var img=req.body.image;
    var price=req.body.price;
    var dec=req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround={name:name,image:img, description:dec, author: author,price:price};
    // campgrounds.push(newCampGround);
    //Now we will be adding data to the database..
    Campground.create(newCampGround, function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlyCreated);
            res.redirect("/campground");
        }
    });
});

router.get("/new",middleware.isLoggedIn,function(req,res){
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

//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership ,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground: foundCampground});
        });
            

    
});
//update campground route  
router.put("/:id", middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground...
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,upadatedCampground){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    })
    //redirect to the show page..

});
//Destroy Campground

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campground");
        }
        else{
            res.redirect("/campground");
        }
    });
});



module.exports  = router;