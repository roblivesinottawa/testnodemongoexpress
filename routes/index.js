const express = require("express");
const router = express.Router();

const app = express();

/* GET home page. */

router.get("/", (req, res, next) => res.render("index", { title: "Express" }));

router.get("/helloworld", (req, res) =>
  res.render("helloworld", { title: "Hello World from Express!" })
);

router.get("/userlist", (req, res) => {
  let db = req.db;
  let collection = db.get("usercollection");
  collection.find({}, {}, (e, docs) => {
    res.render("userlist", {
      userlist: docs,
    });
  });
});

router.get("/newuser", (req, res) =>
  res.render("newuser", { title: "Add new user" })
);

router.post("/adduser", (req, res) => {
  const db = req.db;
  const userName = req.body.username;
  const userEmail = req.body.userEmail;

  const collection = db.get("usercollection");

  collection.insert(
    {
      username: userName,
      email: userEmail,
    },
    (err, doc) => {
      err
        ? res.send("there was a problem adding data to the database.")
        : res.redirect("userlist");
    }
  );
});

module.exports = router;
