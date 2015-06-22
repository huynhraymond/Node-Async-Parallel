
var request = require('request');
var fs = require('fs');

var url = 'http://q-ec.bstatic.com/images/hotel/square128/286/28633171.jpg'

downloadFile(url, function(err, result){
    if (err) console.log(err);
    else console.log(result);
});

//var stream_r = request();
//var stream_w = fs.createWriteStream('store.jpg');

//stream_r.pipe(stream_w);


//console.log('hello world cuxi');

function downloadFile(url, callback) {
    // callback is invoked after reading the image, or writing the image is complete
    var stream_r = request(url);
    var stream_w = fs.createWriteStream('store.jpg');

    stream_r.on('end', function() {
        console.log("Finish");
    });

    stream_w.on('finish', function() {

    });
}

