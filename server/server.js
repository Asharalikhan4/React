import express from "express";
import session from "express-session";

const app = express();

app.use(session({
  secret: "notSoSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))

app.listen(3000, () => {
  console.log("Server is up at 3000")
});