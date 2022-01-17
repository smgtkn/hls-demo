const http = require('http');
var fs = require('fs');
var myffmpeg=require("./frames.js")
var firstTime=[0,0,0,0]

const PORT = 4000;

http.createServer(function (request, response) {
    console.log('request starting...', new Date());

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
     
    };
    if (request.method === 'OPTIONS') {
        respose.writeHead(204, headers);
        response.end();
        return;
    }
   //////
    
   let ind = request.url.charAt(6);
   if(firstTime[ind]==0){
       firstTime[ind]=1
       myffmpeg.runFfmpeg(ind)


   }
   /////
    var filePath = `./videos/ipcam/video${ind}` + request.url;
    console.log("alo ",filePath);
    fs.readFile(filePath, function (error, content) {
        response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        if (error) {
            console.log("error")
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            console.log(content)
            response.end(content, 'utf-8');
        }
    });
}).listen(PORT);
console.log(`Server listening PORT ${PORT}`);