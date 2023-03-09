function HTTPPostData(urlStr, dataStr, cb = undefined) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("POST", urlStr, true);
    /*
        Issue: Server-end failed to parse data
        Tried: Content-Type below
                - rawFile.setRequestHeader("Content-type", "application/json");
                - rawFile.setRequestHeader("Content-type", " multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");
                - rawFile.setRequestHeader("Content-type", "multipart/form-data");
        Finding: None of them work for my case
        Solution: Go without Content-Type explicitly declared
    */    
    rawFile.onreadystatechange = async function () {
        if (rawFile.readyState === 4) {
            var ret = rawFile.responseText;
            console.log(ret);
            if (cb == undefined) return;
            cb(ret);
        }
    };
    rawFile.send(dataStr);
}