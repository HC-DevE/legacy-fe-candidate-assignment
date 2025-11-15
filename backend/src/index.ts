import config from "./config/config";
import { createServer } from "./server";

const app = createServer();

app.listen(config.port, () => process.stdout.write(`[api] :${config.port}\n`));
