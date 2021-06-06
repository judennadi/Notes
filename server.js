require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const notesRoute = require("./routes/notes");

const app = express();
// (mongodb://localhost/myNotes)
mongoose
  .connect(process.env.DB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => app.listen(process.env.PORT, console.log("server running")))
  .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cookieParser());

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/notes", notesRoute);

// error handler
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}
