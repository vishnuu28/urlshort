const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongo } = require("./connection");
const { restrucittologinuserOnly, checkauth } = require("./middleware/auth");
const URL = require("./model/url");

const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");

const app = express();
const PORT = 8001;

connectToMongo("mongodb://localhost:27017/short-url").then(() =>
  console.log("Database connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrucittologinuserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkauth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("server start at PORT"));
