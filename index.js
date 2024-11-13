var express=require("express");
var mysql2=require("mysql2");
var multer=require("multer");
var app=express();
var conn=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Ra16nj08it01h@",
    database:"9r"

});
conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("established connection with mysql2");
    }
})
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname);
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
var upload=multer({storage});
app.post("/submit",upload.single("file"),(req,res)=>{
   var data={
      ...req.body,
    file:req.file["path"]
   };
   conn.query(`insert into ryhtm set ?`,data,(err,result)=>{
    if(err){
        res.send(err);
    }
    else{
        res.send(result);
    }
   })
   
});
app.listen(3087,()=>{
    console.log("connection established");
})