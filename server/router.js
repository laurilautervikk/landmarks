const express = require("express");
const router = express.Router();
//const request = require("request");
//const app = express();

//Dummy object to hold info for now
const landMarks = [{
        id: 1,
        title: "Chinese wall",
        imageUrl: "http://www.wermac.org/civil_eng/civil_eng_pics/great_wall_china.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 2,
        title: "Statue of liberty",
        imageUrl: "https://i.guim.co.uk/img/media/4a29dde46c17e8a07f98e4e5947d49964d074923/0_348_6000_3600/master/6000.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=88c75e6319ec9d3588bb6e17ae92ff68",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 3,
        title: "Eiffel Tower",
        imageUrl: "https://www.swedishnomad.com/wp-content/images/2019/03/Paris.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 4,
        title: "Big Ben",
        imageUrl: "https://beautifulglobal.com/wp-content/uploads/2018/03/Big-Ben-2-1024x683.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 5,
        title: "Stonehenge",
        imageUrl: "https://images.immediate.co.uk/production/volatile/sites/7/2020/04/GettyImages-105955888-f1865bb.jpg?quality=90&resize=768%2C574",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 6,
        title: "Taj Mahal",
        imageUrl: "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 7,
        title: "Machu Picchu",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
    },
    {
        id: 8,
        title: "Grand Canyon",
        imageUrl: "https://westernnews.media.clients.ellingtoncms.com/img/photos/2021/03/23/HorseshoeBendGrandCanyon_pTg96X5.jpg",
        description: "a building or other place that is of outstanding historical, aesthetic, or cultural importance, often declared as such and given a special status, ordaining its preservation, by some authorizing organization.",
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
router.post("/post-landmark", function(req, res) {
    landMarks.push(req.body);
    console.log("req.body: ", req.body);
    console.log("new list: ", landMarks);
    res.send("POST request successful");
});

module.exports = router;