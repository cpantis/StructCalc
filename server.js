import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/robots.txt", (_, res) => {
  res.type("text/plain").sendFile(path.join(__dirname, "public", "robots.txt"));
});

app.get("/sitemap.xml", (_, res) => {
  res.type("application/xml").sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`StructCalc AI running on port ${PORT}`);
});
