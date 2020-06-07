import express from "express";
import path, { dirname } from "path";
import recipeScraper from "recipe-scraper";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// API call
app.get("/api/recipe/:url", async (req, res) => {
  let { url } = req.params;
  try {
    let recipe = await recipeScraper(url);
    res.json(recipe);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.sendStatus(404);
  }
});

if (process.env.NODE_ENV === "production") {
  // Server any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port ${port}`));
