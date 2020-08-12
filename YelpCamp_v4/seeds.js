var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data=[
    {name:"Vlad Bagecian",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"SnapWire",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Cliford Mervil",image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Trace Hudson",image:"https://images.pexels.com/photos/2535207/pexels-photo-2535207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Pixabay",image:"https://images.pexels.com/photos/266436/pexels-photo-266436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Jens Mehnke",image:"https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Denial Joseph Petty",image:"https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Denial Ap",image:"https://images.pexels.com/photos/868306/pexels-photo-868306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Alen Caldwell",image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Serkan Turk",image:"https://images.pexels.com/photos/1723722/pexels-photo-1723722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."},
    {name:"Doungh Nah",image:"https://images.pexels.com/photos/1328876/pexels-photo-1328876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",description:"blah blah blah..."}
];




function seedDB(){
    //remove all campground..
    Campground.remove({},function(err){
        if(err){
            console.log(err);
            
        }
        else{
            console.log("Remove everything");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added a campground");
                        Comment.create({
                            text: "This is the great place i wish there was internet.",
                            author: "Homer"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                                
                            }
                            else{
                                
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new commment");
                                
                            }
                        });
                        
                    }
                });
            });
            
        }
    });
    //add few campground and few commment..
}
module.exports  =  seedDB;