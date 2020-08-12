var express=require("express");
var app=express();

var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));



app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing")
});
var campgrounds=[
    {name:"Vlad Bagecian",image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"SnapWire",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Cliford Mervil",image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Trace Hudson",image:"https://images.pexels.com/photos/2535207/pexels-photo-2535207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Pixabay",image:"https://images.pexels.com/photos/266436/pexels-photo-266436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Jens Mehnke",image:"https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Denial Joseph Petty",image:"https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Denial Ap",image:"https://images.pexels.com/photos/868306/pexels-photo-868306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Alen Caldwell",image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Serkan Turk",image:"https://images.pexels.com/photos/1723722/pexels-photo-1723722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Doungh Nah",image:"https://images.pexels.com/photos/1328876/pexels-photo-1328876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
];

app.get("/campground",function(req,res){
    
    res.render("campground",{campgrounds:campgrounds});
});

app.post("/campground",function(req,res){
    // res.send("you hit the post rout");
    var name=req.body.name;
    var img=req.body.image;
    var newCampGround={name:name,image:img};
    campgrounds.push(newCampGround);
    
    
    res.redirect("/campground");
});

app.get("/campground/new",function(req,res){
    res.render("new");
});





app.get("*",function(req,res){
    res.send("you entered wrong ip");
});
app.listen(3000,function(){
    console.log("server has started")
    console.log("don't forget to kill the port using fuser -k 3000/tcp");
    
});