var express = require("express");
var fileUpload = require('express-fileupload');
var cors = require("cors");
const root = __dirname + '/public/';

var app = express();
var router = express.Router();

app.set("title", "IMG-SERVER");
app.use(fileUpload());
app.use(cors({origin: '*', credentials: true}));

router.post("/images", function (req, res){
    const incoming_file = req.files.file;
    const upload_path = root + incoming_file.name;
    res.setHeader("ContentType", "application/json");
    incoming_file.mv(upload_path, function(err){
        if (err) {
            console.log('error ' + err);
            return res.status(500).send(err);
        }
        /*
        console.log(
            JSON.stringify({
                message: `${incoming_file.name} uploaded`,
                owner: req.body.username,
                gender: req.body.gender
            })
        );
        */
        res.status(200).send(JSON.stringify({
            message: `${incoming_file.name} uploaded`,
            owner: req.body.username,
            gender: req.body.gender
        }));
        return;
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