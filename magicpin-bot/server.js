const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const healthRoutes = require("./routes/health.routes");
const metadataRoutes = require("./routes/metadata.routes");
const contextRoutes = require("./routes/context.routes");
const tickRoutes = require("./routes/tick.routes");
const replyRoutes = require("./routes/reply.routes");
const loadDatasets = require("./services/datasetLoader");

dotenv.config();

const app = express();
loadDatasets();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Magicpin Bot API Running...");
});

app.use("/v1", healthRoutes);
app.use("/v1", metadataRoutes);
app.use("/v1", contextRoutes);
app.use("/v1", tickRoutes);
app.use("/v1", replyRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});