const express = require("express");
const router = express.Router();
const { Landmarks } = require("./dbConnection");
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);


//GET landmarks list
router.get("/get-landmarks", async function (request, response) {
  const result = await Landmarks.find();
  response.status(200).send(result)
});


//GET a single landmark by id
router.get("/get-landmark/:id", async function (request, response) {
  let result = await Landmarks.findOne({ _id: request.params.id });
  console.log('Info from DB', result);
  response.send(result);
});

//Add a new landmark
router.post("/add-landmark", async function (request, response) {
  if (request.body) {
    await Landmarks.create(request.body);
    console.log("BE Add landmark initiated");
  }
  response.send("BE Add landmark done");
});

router.patch("landmarkdmark/:id", async function (request, response) {
  //console.log("BE started");
  let state = await Landmarks.findOne({ _id: request.params.id });
  //console.log("BE state: ", state.status);
  //set value for update query, based on current state from db
  let flipflop = "";
  if (state.status === "ACTIVE") {
    flipflop = "DONE";
  } else {
    flipflop = "ACTIVE";
  }
  //display state value
  const result = await Landmarks.updateOne(
    { _id: request.params.id },
    { $set: { status: flipflop } }
  );
  console.log("state Flipped to: ", flipflop);
  response.send(result);
});

//Delete landmark
router.post("/delete-landmark/:id", async function (request, response) {
  const result = await Landmarks.deleteOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});


module.exports = router;
