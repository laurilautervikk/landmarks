const express = require("express");
const router = express.Router();
//const request = require("request");
const app = express();


//Dummy object to hold info for now
const landMarks = [
  {
    id: 1,
    title: "Chinese wall",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 2,
    title: "Statue of liberty",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 3,
    title: "Eiffel Tower",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 4,
    title: "Chinese wall2",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 5,
    title: "Statue of liberty2",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 6,
    title: "Eiffel Tower2",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 7,
    title: "Chinese wall3",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
  {
    id: 8,
    title: "Statue of liberty3",
    imageUrl: "https://en.pimg.jp/065/184/793/1/65184793.jpg",
  },
];

//GET landmarks list
router.get('/get-landmarks', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'landmarks retrieved successfully',
    landmarks: landMarks
  })
});

//GET a single landmark

router.get('/get-landmark/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  function findId(input) {
    return input === id;
  }

  //const result = landMarks.find( ({id}) => id === req.params.id);
  console.log(landMarks.find(findId))
  /* if (id == result.id) {
    //success
    res.status(200).send({
      success: 'true',
      message: 'landmark found',
      landmark: result
    })

  } else {
    //fail
    return res.status(404).send({
      success: 'false',
      message: 'landmark does not exist',
      });
  } */
 
  })




/* app.get('/get-landmark/:id', (req, res) => {

  const id = parseInt(req.params.id, 10);

  const result = landMarks.find( ({id}) => id === req.params.id);

    if (result.id === id) {
      console.log('landmark found')


      return res.status(200).send({
        success: 'true',
        message: 'landmark retrieved successfully',
        landmark :result,
      });
    } 
  

  return res.status(404).send({
    success: 'false',
    message: 'landmark does not exist',
    });
}); */



// route for POST request
router.post("/post-landmark", function (req, res) {
  landMarks.push(req.body);
  console.log("req.body: ", req.body);
  console.log("new list: ", landMarks);
  res.send("POST request successful");
});

module.exports = router;


