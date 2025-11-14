// import express from "express";

// const app = express();

// app.use(express.json());

// // Routes
// app.use("/api/", itemRoutes);

// // Global error handler (should be after routes)
// app.use(errorHandler);

// export default app;

import { createServer } from "./server";
import config from "./config/config";

const app = createServer();

app.listen(config.port, () => process.stdout.write(`[api] :${config.port}\n`));
