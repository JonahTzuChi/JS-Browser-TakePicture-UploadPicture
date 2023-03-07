/*
    Link: https://www.terlici.com/2015/05/16/uploading-files-locally.html
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
app.use(express.json());

router.post("/images", uploading.single('face'), async (req, res, next) =>{
    res.status(200).json({message: "done"});
});

app.use(router);

const my = { name: "server", port: 3000, host: "127.0.0.1" };
var server = app.listen(my.port, my.host, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`${my.name} is listening at http://%s:%s`, host, port);
    console.log(__dirname);
});