const express = require("express");
const router = express.Router();
const { Landmarks } = require("./dbConnection");
const authRoutes = require("./authRoutes");
router.use("/auth", authRoutes);

//GET landmarks list
router.get("/get-landmarks", async function (request, response) {
  //Pagination params from FE
  const options = {
    page: request.query.page,
    limit: request.query.limit,
  };
  //Search params from FE
  const searchString = new RegExp(
    request.query.searchFor ? request.query.searchFor.trim() : "",
    "i"
  );
  console.log("request ", request.query);

  const result = await Landmarks.paginate(
    {
      $or: [{ title: searchString }],
  console.log("request ", request.query.searchFor);

  await Landmarks.paginate(
    {
      $or: [{ title: searchString }, { description: searchString }],
    },
    options,
    (err, result) => {
      response.send(result);
    }
  );
  //const result = await Landmarks.find(); // WITHOUT PAGINATION
  //response.status(200).send(result);
});

/* router.get("/get-landmarks", async function (request, response) {
  const searchString = new RegExp(stringFromFe ? stringFromFe.trim() : '', 'i')
  const result = await Landmarks.find({
      $or: [
        { 'landmark.title': searchString },
        ]
    })
    response.status(200).send(result);
  });
 */

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

//Add Comment
router.post("/add-comment/:id", async function (request, response) {
  await Landmarks.findOneAndUpdate(
    { _id: request.params.id },
    {
      $addToSet: {
        comments: [
          {
            userId: request.params.userId,
            userName: request.params.userName,
            commentId: request.params.commentId,
            commentBody: request.params.commentBody,
          },
        ],
      },
    }
  );
  console.log(request.body);
  response.send("Comment Added");
});

module.exports = router;
