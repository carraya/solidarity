import express from "express";
import Gun from "gun";
import cors from "cors";

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(Gun.serve);

app.get("/", (req, res) => {
  res.status(200).send("> DEBUG: This Gun Node is live.");
});

const server = app.listen(port, () => {
  console.log(`> DEBUG: Gun Node is listening on port: ${port}`);
});

Gun({ web: server });
