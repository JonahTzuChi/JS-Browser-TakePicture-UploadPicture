function HTTPPostData(urlStr, dataStr, cb = undefined) {
    console.table(dataStr);
    var rawFile = new XMLHttpRequest();
    rawFile.open("POST", urlStr, true);
    //rawFile.setRequestHeader("Content-type", "application/json");
    rawFile.setRequestHeader("Content-type", " multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");
    rawFile.onreadystatechange = async function () {
        if (rawFile.readyState === 4) {
            var ret = rawFile.responseText;
            if (cb == undefined) return ret;
            cb(ret);
        }
    };
    rawFile.send(dataStr);
}