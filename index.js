const express = require("express");
const session = require("express-session");
const { connection } = require("./db");
const { userRoutes } = require("./routes/userRoutes");
const { crudRoutes } = require("./routes/crudRoutes");
const { forgotPasswordRoute } = require("./routes/forgotPassword");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Add express-session middleware
app.use(session({
  secret: process.env.SESSION_KEY, // Change this to a strong, random key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if your server is using HTTPS
}));

app.use("/userauth", userRoutes);
app.use("/crud", crudRoutes);
app.use("/email", forgotPasswordRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
