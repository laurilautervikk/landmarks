const express = require("express");
const app = express()
const cors = require('cors');
var config = require('./test.json')

app.use(cors());

app.get("/", (req, res) => {
    res.send(config);
});
app.listen(3000, function() {
    console.log(`Example app listening at http://localhost:{port}`);
});