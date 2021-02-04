var express = require("express");
var uuid = require("uuid");
var fs = require("fs");
var path = require("path");


const app = express();
var PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "db/db.json"))
});

// Create new note - takes in JSON input
app.post("/api/notes", function (req, res) {
  const notes = JSON.parse(fs.readFileSync("db/db.json"))
  var newNote = req.body;
  newNote.id = uuid.v4();
  console.log(res);
  notes.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(notes))
  res.json(newNote);
});

// Displays a single note, or returns false
app.delete("/api/notes/:id", function (req, res) {
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  const deletedNote = notes.filter(removeNote => removeNote.id != req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(deletedNote));
  console.log(deletedNote);
  res.json(deletedNote);
});


// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("server listening on: http://localhost:" + PORT);
});