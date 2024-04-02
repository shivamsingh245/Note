import React, { useContext, useEffect, useCallback } from 'react';
import { GlobalContext } from '../../context';
import axios from 'axios';
import classes from './styles.module.css';
import { FaTrash, FaEdit, FaPalette } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { noteList, setNoteList, pending, setPending, selectedColors, setSelectedColors } = useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListOfNotes = useCallback(async () => { 
    setPending(true);
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      const result = response.data;

      if (result && result.noteList && result.noteList.length) {
        setNoteList(result.noteList);
      } else {
        setNoteList([]);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setPending(false);
    }
  }, [setPending, setNoteList]);

  useEffect(() => {
    fetchListOfNotes();
  }, [fetchListOfNotes]);

  const handleDeleteNote = async (getCurrentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${getCurrentId}`);
      fetchListOfNotes();
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Error deleting note. Please try again later.');
    }
  };

  const handleEdit = (getCurrentNoteItem) => {
    navigate('/add-note', { state: { getCurrentNoteItem } });
  };

  useEffect(() => {
    const storedColors = localStorage.getItem('selectedColors');
    if (storedColors) {
      setSelectedColors(JSON.parse(storedColors));
    }
  }, [setSelectedColors]);

  useEffect(() => {
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
  }, [selectedColors]);

  const handleColorChange = (noteId, color) => {
    setSelectedColors({ ...selectedColors, [noteId]: color });
  };

  return (
    <div className={classes.wrapper}>
      <h1>Note List</h1>
      {pending ? (
        <h1>Loading Notes! Please wait</h1>
      ) : (
        <div className={classes.noteList}>
          {noteList && noteList.length ? (
            noteList.map(noteItem => (
              <div key={noteItem._id} style={{ backgroundColor: selectedColors[noteItem._id] || '#FFFFFF' }}>
                <p className={classes.title}>{noteItem.title}</p>
                <hr />
                <p className={classes.description}>{noteItem.description}</p>
                <FaEdit className={classes.icons} onClick={() => handleEdit(noteItem)} />
                <FaTrash className={classes.icons} onClick={() => handleDeleteNote(noteItem._id)} />
                <FaPalette
                  className={classes.icons}
                  onClick={() => {
                    const color = prompt('Enter color (hex code or name):');
                    if (color) {
                      handleColorChange(noteItem._id, color);
                    }
                  }}
                />
                <span className={classes.date}>{new Date(noteItem.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <h3>No Notes Added</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
