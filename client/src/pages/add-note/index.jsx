import classes from './styles.module.css';
import { GlobalContext } from '../../context';
import { useContext, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewNote = () => {
  const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveNoteToDatabase = async () => {
    try {
      const response = isEdit ? await axios.put(`http://localhost:5000/api/notes/update/${location.state.getCurrentNoteItem._id}`, {
        title: formData.title,
        description: formData.description,
      }) : await axios.post('http://localhost:5000/api/notes/add', {
        title: formData.title,
        description: formData.description
      });
      const result = response.data;
      // console.log(result);

      if (result) {
        setIsEdit(false);
        setFormData({
          title: '',
          description: ''
        });
        navigate('/');
        toast.success(isEdit ? 'Note updated successfully!' : 'Note added successfully!');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Error saving note. Please try again later.');
    }
  };

  useEffect(() => {
    if (location.state) {
      const { getCurrentNoteItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentNoteItem.title,
        description: getCurrentNoteItem.description
      });
    }
  }, [location, setFormData, setIsEdit]);

  return (
    <div className={classes.formContainer}>
      <div className={classes.wrapper}>
        <h1>{isEdit ? 'Edit a Note' : 'Add a Note'}</h1>
        <div className={classes.formWrapper}>
          <input
            name='title'
            placeholder='Enter Note Title'
            id='title'
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({
              ...formData,
              title: e.target.value,
            })}
          />

          <textarea
            name="description"
            placeholder='Enter Note Description'
            id="description"
            value={formData.description}
            onChange={(event) => setFormData({
              ...formData,
              description: event.target.value,
            })}
          />

          <button onClick={handleSaveNoteToDatabase}>
            {isEdit ? 'Edit Note' : 'Add Note'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewNote;
