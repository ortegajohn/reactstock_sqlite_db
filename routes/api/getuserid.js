const router = require("express").Router();
const booksController = require("../../controllers/stocksController");
const { isLoggedIn } = require('../../config/helper_auth');
const express = require('express');
const expressRouter = express.Router();

// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

  router
  // .route("/")
  // .post(booksController.savebook);
  .get("/", isLoggedIn, (req, res) => {
    // console.log("req.user.username",req.user.username)
    // console.log("req.user.id",req.user.id)
    // console.log("req.user.username",req)//Object.keys(object1)
    // console.log("req.user.username",Object.keys(req))
    // console.log("req.user.username",req.server)
    console.log("req.session",req.session)
    console.log("req.user",req.user)
    // console.log("req.user.id",req)
    var send = {
      userid: req.user
        // username:req.user.username,
        // userid: req.user.id
    }
    res.json(send);
    

});
  // .put(booksController.update)
  // .delete(booksController.remove);

module.exports = router;
