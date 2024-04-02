const mongoose = require('mongoose');
const Note = require('../model/Note');

//fetch list of Notes
const fetchListOfNotes = async (req, res) => {
    let noteList;
    try {
        noteList = await Note.find();
    } catch (e) {
        console.log(e)
    }

    if (!noteList) {
        return res.status(404).json({ message: 'No Notes Found' });
    }

    return res.status(200).json({ noteList });
}

//add a new Note
const addNewNote = async (req, res) => {
    const { title, description } = req.body;

    const newlyCreatedNote = new Note({
        title, description
    })

    try {
        await newlyCreatedNote.save();
    } catch (e) {
        console.log(e)
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedNote.save(session);
        session.commitTransaction();
    } catch (e) {
        return res.status(500).json({ message: e });
    }

    return res.status(200).json({ newlyCreatedNote });

}

//delete a Note
const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentNote = await Note.findByIdAndDelete(id);
        if (!findCurrentNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json({ message: 'Successfully Deleted Note' });
    } catch (e) {
        return res.status(500).json({ message: 'Unable to delete! Please try again' });
    }
}

//update a Note
const updateNote = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;
    let currentNoteToUpdate;

    try {
        currentNoteToUpdate = await Note.findByIdAndUpdate(id, {
            title, description
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Something went wrong while updating ! Please try again' });
    }

    if (!currentNoteToUpdate) {
        return res.status(500).json({ message: 'Unable to update!' });
    }

    return res.status(200).json({ currentNoteToUpdate });
}

module.exports = { fetchListOfNotes, deleteNote, updateNote, addNewNote };