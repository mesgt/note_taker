var express = require("express");
var fs = require("fs");
var path = require("path");
const app = express();
var PORT = process.env.PORT || 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(express.static("./Develop/Public"));
const notes = [];

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/Public/index.html"))
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/Public/notes.html"));
});

  // Displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

  // Create new note - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  notes.push(newNote);
  res.json(newNote);
});

  // Displays a single note, or returns false
app.delete("/api/notes/:id", function(req, res) {
  var deletedNote = res.json(id)
  console.log(deletedNote);
  });
  


  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("server listening on: http://localhost:" + PORT);
  });