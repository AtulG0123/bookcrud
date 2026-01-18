const express = require("express");
const app = express();
const DBConnetion = require("./database");
const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.route");
const { authMiddleware } = require("./middleware/auth.middleware");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

DBConnetion();
//routes
app.get("/", (req, res) => {
  res.send("welcome to you first API");
});

app.use("/Book", authMiddleware, bookRoutes);
app.use("/User", userRoutes);

app.listen(3001, (req, res) => {
  console.log("server is running on port 3001");
});
