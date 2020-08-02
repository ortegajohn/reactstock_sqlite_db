const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authentication = require("./authentication");


// API Routes
router.use("/api", apiRoutes);
router.use("/", authentication);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;


exports.index = function(req, res){
  res.render('index', { name: 'John' });
};