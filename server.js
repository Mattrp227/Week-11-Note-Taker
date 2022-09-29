//Generate ID
const generateID = require('generate-unique-id');


//create constructors

const fs = require('fs');
const express = require("express");
const notes = require("./db/db.json");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;


//create new note
function newNote(body notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2));
        return note;

};


