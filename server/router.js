const express = require("express");
const router = express.Router();
const { Landmarks } = require("./dbConnection");
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

//GET landmarks list
router.get("/get-landmarks", async function (request, response) {
  const options = {
    page: request.query.page,
    limit: request.query.limit,
  };
  console.log("request ", request.query);

  Landmarks.paginate({}, options, (err, result) => {
    // result.docs
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
    response.send(result);
  });

  //const result = await Landmarks.find(); // WITHOUT PAGINATION

  //response.status(200).send(result);
});

//GET a single landmark by id
router.get("/get-landmark/:id", async function (request, response) {
  let result = await Landmarks.findOne({ _id: request.params.id });
  console.log("Info from DB", result);
  response.send(result);
});

//Add a new landmark
router.post("/add-landmark", async function (request, response) {
  if (request.body) {
    await Landmarks.create(request.body);
    console.log("BE Add landmark started");
  }
  console.log("BE Add landmark ended");
  response.send("Addition sucessful");
});

router.patch("/edit-landmark/:id", async function (request, response) {
  console.log("BE edit started");
  await Landmarks.updateOne(
    { _id: request.params.id },
    {
      $set: {
        title: request.body.title,
        imageUrlSet: request.body.imageUrlSet,
        description: request.body.description,
      },
    }
  );
  console.log("BE edit ended");
  response.send("Edit successful");
});

//Delete landmark
router.delete("/delete-landmark/:id", async function (request, response) {
  await Landmarks.deleteOne({ _id: request.params.id });
  console.log("Landmark Deleted BE");
  response.send({}); // "Landmark Deleted BE" ??
});

module.exports = router;
