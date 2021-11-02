const express = require("express");
const router = express.Router();


router.get("/get-landmarks", function (req, res) {
  const landMarks = [
    {
      title: "Chinese wall",
      status: "ACTIVE",
    },
    {
      title: "Statue of liberty",
      status: "ACTIVE",
    },
    {
      title: "Eiffel Tower",
      status: "ACTIVE",
    },
  ];

  res.send(landMarks);
});

module.exports = router;
