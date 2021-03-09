const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://cj:cj@cluster0.kpsng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);

app.listen(8080);
