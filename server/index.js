// Express v4.16.0 and higher
// --------------------------
const express = require("express");
const app = express();
//const bodyParser = require("body-parser"); //Not needed when using below 4 lines
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const routes = require("./router");

//BASIC SOLUTION
//for API routes
app.use("/api", routes);

//Respond if GET request is made to root URL
app.get("/", (req, res) => {
  res.send(
    "Hello from Landmarks backend!" +
      "<br>" +
      "GET REQUEST > http://localhost:3000/api/get-landmarks" +
      "<br>" +
      "GET REQUEST (ID)> http://localhost:3000/api/get-landmark/1" +
      "<br>" +
      "POST REQUEST > http://localhost:3000/api/post-landmark"
  );
});

// enable env port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Landmarks backend listening on port: ${PORT}`)
);
