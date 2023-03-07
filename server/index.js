/*
    npm     : https://www.npmjs.com/package/multer
*/

var express = require("express");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/')
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

var uploading = multer({
    storage: storage
})

var app = express();
var router = express.Router();

app.set("title", "IMG-SERVER");

// Remember to apply the middleware function as the second parameter
// I set the fieldname as face, but you may set it to anyname that best suit your use case
router.post("/images", uploading.single('face'), (req, res) =>{
    // console.log(req.file); // uncomment this section to see the structure of req.file
    res.status(200).json({message: `uploaded ${req.file.filename}`});
});

//
/*
    I attempt to factor error handling into my code, but failed.
    I find handling the error very challenging, because I do not know how to generate an error specifically for multer use case.
    I tried to upload without a file, but it never raise an error. 
    The workaround I have for now is to identify whether req.file is undefined. 
    When no file is attached, it is undefined. 
*/
var handler = uploading.single('face');
router.post("/images-error-handling", (req, res)=>{
    var message;
    handler(req, res, function (err){
        if (err instanceof multer.MulterError){
            res.status(200).json({ message: 'failed, multer error' });
            return;
        }
        if (err) {
            res.status(200).json({ message: 'failed' });
            return;
        }
        if (req.file == undefined) {
            res.status(200).json({ message: `upload failed, suspect no file is attached` });
            return;
        }
        res.status(200).json({ message: `uploaded ${req.file.filename}` });
    });
});

app.use(router);

const my = { name: "server", port: 3000, host: "127.0.0.1" };
var server = app.listen(my.port, my.host, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`${my.name} is listening at http://%s:%s`, host, port);
    console.log(__dirname);
});