const express = require("express");
const router = express.Router();
//const request = require("request");
//const app = express();

//Dummy object to hold info for now
const landMarks = [
  {
    id: 1,
    title: "Chinese wall",
    imageUrl:
      "http://www.wermac.org/civil_eng/civil_eng_pics/great_wall_china.jpg",
    description:
      "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states.",
  },
  {
    id: 2,
    title: "Statue of liberty",
    imageUrl:
      "https://i.guim.co.uk/img/media/4a29dde46c17e8a07f98e4e5947d49964d074923/0_348_6000_3600/master/6000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88c75e6319ec9d3588bb6e17ae92ff68",
    description:
      "The Statue of Liberty is a 305-foot (93-metre) statue located on Liberty Island in Upper New York Bay, off the coast of New York City.",
  },
  {
    id: 3,
    title: "Eiffel Tower",
    imageUrl:
      "https://www.swedishnomad.com/wp-content/images/2019/03/Paris.jpg",
    description:
      "The Eiffel Tower is a wrought iron tower that stands 1,063 ft (324 m) tall. It was designed for the Exposition Universelle, a world fair held in Paris in 1889.",
  },
  {
    id: 4,
    title: "Big Ben",
    imageUrl:
      "https://beautifulglobal.com/wp-content/uploads/2018/03/Big-Ben-2-1024x683.jpg",
    description:
      "Big Ben is a tower clock known for its accuracy and for its massive hour bell. Strictly speaking, the name refers only to the bell, which weighs 15.1 tons (13.7 metric tons).",
  },
  {
    id: 5,
    title: "Stonehenge",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/7/2020/04/GettyImages-105955888-f1865bb.jpg?quality=90&resize=768%2C574",
    description:
      "Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England, two miles (3 km) west of Amesbury.",
  },
  {
    id: 6,
    title: "Taj Mahal",
    imageUrl:
      "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
    description:
      "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
  },
  {
    id: 7,
    title: "Machu Picchu",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg",
    description:
      "Machu Picchu is a 15th-century Inca site located on a ridge between the Huayna Picchu and Machu Picchu mountains in Peru.",
  },
  {
    id: 8,
    title: "Grand Canyon",
    imageUrl:
      "https://westernnews.media.clients.ellingtoncms.com/img/photos/2021/03/23/HorseshoeBendGrandCanyon_pTg96X5.jpg",
    description:
      "Grand Canyon is considered one of the finest examples of arid-land erosion in the world. Incised by the Colorado River, the canyon is immense, averaging 4,000 feet deep for its entire 277 miles.",
  },
];

//GET landmarks list
router.get("/get-landmarks", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "landmarks retrieved successfully",
    landmarks: landMarks,
  });
});

//GET a single landmark by id
router.get("/get-landmark/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  let result = landMarks.find((landmark) => {
    return landmark.id === id;
  });
  //console.log('result ', result)

  if (result) {
    //success
    res.status(200).send({
      success: "true",
      message: "Landmark found",
      landmark: result,
    });
  } else {
    //fail
    return res.status(404).send({
      success: "false",
      message: "Landmark does not exist",
    });
  }
});

// route for POST request
router.post("/post-landmark", function (req, res) {
  landMarks.push(req.body);
  console.log("req.body: ", req.body);
  console.log("new list: ", landMarks);
  res.send("POST request successful");
});

module.exports = router;
