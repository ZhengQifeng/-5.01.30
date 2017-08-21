var express=require("express");
var app=express();
var fs=require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, __dirname+'/tmp/')  
  },  
  filename: function (req, file, cb) {  
    cb(null, file.fieldname + '-' + Date.now()+"."+file.originalname.split(".").reverse()[0])  
  }  
});  
   
var upload = multer({ storage: storage });

app.get("/index.html",function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
});

app.post('/upfile', upload.array('image', 12),  function (req, res) {

   console.log(req.files);  // 上传的文件信息

   response = {
        message:'File uploaded successfully', 
        filename:req.files[0].originalname
    };

    console.log( response );
    res.end( JSON.stringify( response ) );
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});