var express = require("express");
var fs = require("fs");
var path = require("path");
// const { index } = require("index");
const app = express();
var PORT = process.env.PORT || 8050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(express.static("/public"));
// const notes = [];

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

  // Displays all characters
app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

  // Displays a single character, or returns false
app.get("/api/notes/:notes", function(req, res) {
    var input = req.params.notes;

    console.log(input);

    for (var i = 0; i < notes.length; i++) {
    if (input === notes[i].id) {
        return res.json(notes[i]);
      }
    }

    return res.json(false);
  });
  
  // Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});

  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });