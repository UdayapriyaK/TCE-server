const express = require("express");
const cors = require("cors");
const bodyParser=require("body-parser") //
const multer=require('multer'); //
const mongodb=require('mongodb');//
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express()

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (process.env.REACT_URL.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(bodyParser.urlencoded({extended:true}))//

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// var storage=multer.diskStorage({    //
//   destination:function(req,file,cb){
//     cd(null,'Uploads')
//   },
//   filename:function(req,file,cb){
//     cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
//   }
// });

// var upload=multer({
//   storage:storage
// })

// MongoClient.connect(url,{
//   useUnifiedTopology:true,useNewUrlParser:true
// },(err,client)=>{
//   if(err) return console.log(err);
//   db=client.db('Images');
//   app.listen(5000,()=>{
//     console.log("Mongodb server listening at 5000")
//   })
// })
// app.post('/uploadfile',upload.single('myfile')) //

//Database
const db = require("./db/db");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const adminRouter = require('./routes/admin-router')
app.use('/admin', adminRouter)

const userRouter = require("./routes/user-router");
app.use("/userApi", userRouter);

const port = process.env.PORT || 5000
app.listen(port, console.log(`Connected to server on port ${port}`))
