import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import authRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING);

const app = express();
const port = process.env.PORT_NUMBER;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(
  session({
    name: "connect.sid",
    secret: "Some secret we have right here.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Register and Login routes
app.use(authRouter);

// Note CRUD and filtering routes
app.use(noteRouter);

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
