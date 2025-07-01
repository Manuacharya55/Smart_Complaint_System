import express from "express";
import connectDB from "./db/index.js";
import GlobalErrorHandler from "./utils/GlobalError.js";
import adminRouter from "./router/admin.router.js";
import authRouter from "./router/auth.router.js";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port");
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.use(GlobalErrorHandler);
