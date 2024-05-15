import express from "express";
import compression from "compression";
import sirv from "sirv";

const port = process.env.PORT || 5173;
const base = process.env.BASE_PATH || "/";

const app = express();

app.use(compression());
app.use(base!!, sirv("./static"));

app.listen(port, () => {
  console.log("Server started on port", port);
});
