import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database/index.js";
import { GlobalErrorHandler } from "./utils/GlobalError.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());


import AuthRouter from "./router/Auth.route.js";
import DepartmentRouter from "./router/Department.route.js";
import PlaceRouter from "./router/Place.route.js";
import UserRouter from "./router/Users.route.js";
import ComplaintRouter from "./router/Complaint.route.js";

app.use("/api/auth",AuthRouter)
app.use("/api/department",DepartmentRouter)
app.use("/api/place",PlaceRouter)
app.use("/api/users",UserRouter)
app.use("/api/complaint",ComplaintRouter)


app.use(GlobalErrorHandler)


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    process.exit(0);
  });



