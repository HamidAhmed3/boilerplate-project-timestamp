// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// api date -> date
app.get("/api/:date", (req,res)=> {
  let inputDate = req.params.date;

  if(!isNaN(inputDate)){
    inputDate = parseInt(inputDate);
  }

  // input date to a Unix timestamp
  const dateRes = new Date(inputDate);

  if(dateRes == "invalid"){
    return res.json({ error : "Invalid Date" });
  }

  res.send({ unix: dateRes.getTime(), utc: dateRes.toUTCString() })
   
})

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
