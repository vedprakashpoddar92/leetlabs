import express from "express";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json()); // to accept json data

app.use(cookiesParser()); // to accept cookies

// routes Main
app.get("/", (req, res) => {
    res.send("Hello Guys, Welcome to leetlab!!");
})

// Auth Routes
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 8080");
});