const router = require('express').Router();
const { findById, createNewNote, validateNote, updateNote, deleteNote } = require('../../lib/notes.js');
const { notes } = require('../../db/db');

// @collapse

router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
    console.log("get")
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.put('/notes/:id', (req, res) => {
    console.log("put")
    const result = findById(req.params.id, notes);
    if (result) {
        console.log(result)
        if (!validateNote(req.body)) {
            res.status(400).send('The Note is not properly formatted.');
          } else {
            const note = updateNote(req.params.id, req.body, notes);
            res.json(note);
          }
        // console.log(result, req.body)
    } else {
        res.sendStatus(404);
      }


});

router.post('/notes', (req, res) => {
    console.log("post")
  // set id based on what the next index of the array will be
  let idPreset = Date.now()
  req.body.id = idPreset.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The Note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }

  
});

router.delete('/notes/:id', (req, res) => {
    console.log("delete")
    const result = findById(req.params.id, notes);
    if (result) {
            const note = deleteNote(req.params.id, req.body, notes);
            res.json(note);
          } else {
        res.sendStatus(404);
      }


});




module.exports = router;
