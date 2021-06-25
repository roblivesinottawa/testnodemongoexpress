const express = require("express");
const router = express.Router();

const app = express();

/* GET home page. */

router.get("/userlist", (req, res) => {
  let db = req.db;
  let collection = db.get("usercollection");
  collection.find({}, {}, (e, docs) => {
    res.render("userlist", {
      userlist: docs,
    });
  });
});

router.get("/", (req, res, next) => res.render("index", { title: "Express" }));

router.get("/hellofromexpress", (req, res) =>
  res.render("hellofromexpress", { title: "Hello from Express!" })
);

module.exports = router;
