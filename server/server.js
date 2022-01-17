const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

var counter=0;

app.use(express.static(__dirname + '/'));
// app.use(function(req, res, next) {
//     res.header("Cross-Origin-Embedder-Policy", "require-corp");
//     res.header("Cross-Origin-Opener-Policy", "same-origin");
//     next();
//   });
app.get('/',(req,res) => {



       res.setHeader( "Access-Control-Allow-Origin", '*',
       'Access-Control-Allow-Methods','OPTIONS, POST, GET',"Content-Type", "text/html","Cross-Origin-Embedder-Policy", "require-corp","Cross-Origin-Opener-Policy", "same-origin")
      res.sendFile(path.join(__dirname, '/index2.html')); // change filename

})



app.listen(port,()=>{
console.log("App is listening on port 3000");
})