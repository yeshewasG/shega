import * as express from "express";
import * as dotenv from "dotenv";
import { dataSource } from "./config/connnection";
import { errorHandler } from "./middleware/error";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import gradeRoutes from "./routes/gradeRoutes";
import studentsRoutes from "./routes/studentsRoutes";

import { connectDb } from "./config/connnection";
// establish database connection
connectDb();

dotenv.config();
const PORT = process.env.PORT || 5000;
const API_ROUTE = process.env.API_ROUTE || "/api";

// create and setup express app
const app = express();
app.use(express.json());

// handle routes for user
app.use(`${API_ROUTE}/user`, userRoutes);

// handle routes for course
app.use(`${API_ROUTE}/course`, courseRoutes);

// handle routes for grade
app.use(`${API_ROUTE}/grade`, gradeRoutes);
// handle routes for grade
app.use(`${API_ROUTE}/students`, studentsRoutes);

// initialize error Handler
app.use(errorHandler);

// start express server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
