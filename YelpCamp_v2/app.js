var express=require("express");
var app=express();

var bodyParser=require("body-parser");
var mongoose=require("mongoose");


app.use(express.static("public"));

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));



//Database schema setup..
var campgroundSchema =  new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name:"SnapWire",
//     image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     discription: "This is great campground with awesome views"
//     }, function(err,campground){
//         if(err){
//             console.log("something went wrong");
//             console.log(err);
//         }
//         else{
//             console.log("Newly created campground added succesfully!!!");
//             console.log(campground)
//         }
//     }
// );



app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing")
});
// var campgrounds=[
//     {name:"Vlad Bagecian",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"SnapWire",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Cliford Mervil",image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Trace Hudson",image:"https://images.pexels.com/photos/2535207/pexels-photo-2535207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Pixabay",image:"https://images.pexels.com/photos/266436/pexels-photo-266436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Jens Mehnke",image:"https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Denial Joseph Petty",image:"https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Denial Ap",image:"https://images.pexels.com/photos/868306/pexels-photo-868306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Alen Caldwell",image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Serkan Turk",image:"https://images.pexels.com/photos/1723722/pexels-photo-1723722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
//     {name:"Doungh Nah",image:"https://images.pexels.com/photos/1328876/pexels-photo-1328876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
// ];

app.get("/campground",function(req,res){
    
    // res.render("campground",{campgrounds:campgrounds});
    //now we will be getting data from database..
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
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
            
        }
        else{
            // res.render("campground",{campgrounds:all_campgrounds});
            res.render("show",{test: foundCampground});
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