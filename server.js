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
  res.sendFile(path.join(__dirname, "/Develop/db/db.json"))
  // return res.json(notes);
});

  // Create new note - takes in JSON input
app.post("/api/notes", function(req, res) {
  const notes = JSON.parse(fs.readFileSync("/Develop/db/db.json"))
  var newNote = req.body;
  console.log(newNote);
  newNoteid = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync("/Develop/db/db.json", JSON.stringify(notes))
  res.json(newNote);
});

  // Displays a single note, or returns false
app.delete("/api/notes/:id", function(req, res) {
  const notes = JSON.parse(fs.readFileSync("Develop/db/db.json"));
  const deletedNote = notes.filter(removeNote => removeNote.id != req.params.id);
  fs.writeFileSync("/Develop/db/db.json", JSON.stringify(deletedNote));
  console.log(deletedNote);
  res.json(deletedNote);
  });
  

  // Starts the server to begin listening
  app.listen(PORT, function() {
    console.log("server listening on: http://localhost:" + PORT);
  });