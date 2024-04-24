import express from "express";
import cors from "cors";
import ImageRouter from "./src/routes/ImageRouter";
import PlanetRouter from "./src/routes/PlanetRouter";
import AstronautRouter from "./src/routes/AstronautRouter";

const PORT = 4000;

const app = express();

app.use(express.json());

app.use(cors());

// version 1
app.use("/v1/images", ImageRouter);
app.use("/v1/planets", PlanetRouter);
app.use("/v1/astronauts", AstronautRouter);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

export default app;
