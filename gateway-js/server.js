import express from "express";
import routes from "./routes/index.js";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

// Routes
app.use("/", routes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));