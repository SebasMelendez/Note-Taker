const fs = require('fs');
const path = require('path');

// @collapse

  function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
  }

  function createNewNote(body, notesArray){
    const note = body
    notesArray.push(note)
    console.log(notesArray)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2)
    );
    return note;
  }

  function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    // if (typeof note.id !== 'string') {
    //   return false;
    // }
    return true;
  }

  function updateNote(id, body, notesArray){
    const note = body
    note.id = id
    objIndex = notesArray.findIndex((notes => notes.id == id));
    notesArray[objIndex] = note
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2)
    );
    return note;



  }

  function deleteNote(id, body, notesArray){
    const note = body
    note.id = id
    objIndex = notesArray.findIndex((notes => notes.id == id));
    notesArray.splice(objIndex, 1)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2)
    );
    return note;



  }

module.exports = {
    findById,
    createNewNote,
    validateNote,
    updateNote,
    deleteNote

  };