//Generate ID
const generateID = require('generate-unique-id');


//create constructors

const fs = require('fs');
const express = require("express");
const {notes} = require("./db/db.json");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;


//create new note
function newNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2));
        return note;

};

//express functions
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//get notes 
app.get('./', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('./notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('./api/notes', (req, res) => {
    res.json(notes);
});

//post note
app.post('./api/notes', (req, res) => {
req.body.id = generateID();
const note = newNote(req.body, notes);
res.json(note); 
    
});
