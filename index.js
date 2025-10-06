import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { connectMongoDB } from "./connection.js";
import urlRoutes from "./routes/url.js";
import userRoutes from "./routes/user.js";
import adminRouter from "./routes/adminRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";



const app = express();
const PORT = process.env.PORT || 8000;
connectMongoDB(process.env.MONGO_DB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("some error occured while connecting MongoDB", err));

// Stting View Engine that is EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// All the Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Entry Points
app.get("/",(req,res)=>{
return res.json({mess:"request coming to backend"})
})
app.use("/user", userRoutes);
app.use("/url", urlRoutes);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log("Server Started at ", PORT));
