
var request = require('request');
var fs = require('fs');
//var uuid = require('uuid');
var path = require('path');
var async = require('async');

var imgsrcs = require('./sources');

function downloadFile(url, callback) {

    var ext = path.extname(url);
    var filepathname = 'images/' + uuid() + ext;
    console.log(filepathname);

    // callback is invoked after reading the image, or writing the image is complete
    var stream_r = request(url);
    var stream_w = fs.createWriteStream(filepathname);
    stream_r.on('end', function () {
        console.log('finished reading ' + url + ' from http');
    });
    stream_w.on('finish', function () {
        callback(null, url);
    });
    stream_r.pipe(stream_w);
}

// download all the images from the yahoo page
async.parallelLimit(imgsrcs.map(function (src) {
    return downloadFile.bind(null, src);
}), 4, function (err, results) {
    if (err) console.log('something broke');
    else console.log('done with all the images');
});

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
