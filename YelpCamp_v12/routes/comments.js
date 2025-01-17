var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/new", middleware.isLoggedIn ,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/",middleware.isLoggedIn ,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground");    
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campground/"+campground._id);
                }
            });
        }
    });
});

// Edit comment router

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
        }
    });
    
    
});

//post update comment route
router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });

});

// COMMMENTS DESTROY ROUTES
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //findbyId and remove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("bacl");
        }
        else{
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campground/"+req.params.id);
        }
    });
});









module.exports  = router;
