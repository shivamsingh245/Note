const express = require('express');
const noteRouter = express.Router();

const { fetchListOfNotes, deleteNote, updateNote, addNewNote } = require('../controller/note-controller');

noteRouter.get('/', fetchListOfNotes);
noteRouter.post('/add', addNewNote);
noteRouter.put('/update/:id', updateNote);
noteRouter.delete('/delete/:id', deleteNote);

module.exports = noteRouter;