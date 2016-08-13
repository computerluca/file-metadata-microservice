var express = require('express')
var multer = require('multer')
var fs = require('fs-extra')
var app = express();
var upload = multer({ dest: 'uploads/' })

app.get('/',function(req,resp){
    var response = "<p>Submit a file to view its filesize.</p><form action='/size' method='post' enctype='multipart/form-data'> <input type='file' name='file'> <input type='submit'></form>";
    resp.end(response);
    
    
})


app.post('/size', upload.single('file'), function (req, res, next) {
    var filesize = {"size":req.file.size};

fs.remove('uploads/', function (err) {
  if (err) return console.error(err)
 console.log("success");
})
    res.end(JSON.stringify(filesize));
    res.redirect("/");
    
})
app.use(function(req, res){
       res.redirect("/");
});
app.listen(8080);