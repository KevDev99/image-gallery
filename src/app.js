const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { fetchImages } = require("./utils/unsplashApi");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", async (req, res) => {
  const searchString = req.query.search;

  const data = await fetchImages(searchString);
  res.render("index", {
    title: "Image Search Gallery",
    name: "Kevin Taufer",
    images: data,
    year: new Date().getFullYear()
  });
});



app.listen(port, async () => {
  console.log("Server is up on port " + port);
});
