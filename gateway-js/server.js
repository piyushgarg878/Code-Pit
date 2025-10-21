import express from "express";
import routes from "./routes/index.js";
import cors from "cors"
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  methods: ['GET','POST'],
  credentials: true // if using cookies
}));
// Routes
dotenv.config();
app.use("/", routes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));