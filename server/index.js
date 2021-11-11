
const express = require("express");
const app = express()
//const cors = require('cors');
//var config = require('./test.json')


//ADDED
const routes = require("./router");
const port = 3000;

//app.use(cors());

app.get("/", (req, res) => {
    //res.send(config);
    res.send('config')
});

//ADDED
app.use("/api", routes);

//ADDED ${port}
app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});