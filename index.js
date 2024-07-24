const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2 Template" });
});

// YOUR ENDPOINTS GO HERE

// tracks
async function fetchAllTracks() {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
}
app.get("/tracks", async (req, res) => {
  let result = await fetchAllTracks();
  res.status(200).json(result);
});

// tracks/artist/:artist
async function fetchTracksByArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
}
app.get("/tracks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  let result = await fetchTracksByArtist(artist);
  res.status(200).json(result);
});

// tracks/genre/:genre

async function fetchTracksByGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
}
app.get("/tracks/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchTracksByGenre(genre);
  res.status(200).json(result);
});

// tracks/release_year/:year
async function fetchTracksByReleaseYear(release_year) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [release_year]);
  return { tracks: response };
}
app.get("/tracks/release_year/:year", async (req, res) => {
  let year = req.params.year;
  let result = await fetchTracksByReleaseYear(year);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
