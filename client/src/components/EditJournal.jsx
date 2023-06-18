import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postNewEntry } from '../api.js'; // Update the path to match the location of your API file

function useHandleVisitor(username) {
  const navigate = useNavigate();
  const name = useSelector((state) => state.login.name);

  useEffect(() => {
    if (name !== username || name == null) {
      navigate('/');
    }
  }, [name, username, navigate]);
}

export default function EditJournal() {
  const { username } = useParams();
  const email = useSelector((state) => state.login.email);
  useHandleVisitor(username);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [openDate, setOpenDate] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImages((prevImages) => [...prevImages, e.target.result]);
    };

    reader.readAsDataURL(file);
  };

  const handleClearImages = () => {
    setImages([]);
  };

  const handleSaveJournalEntry = async () => {
    try {
      const encodedImages = images.map((image) => {
        const base64Data = image.split(',')[1]; // Extract base64 data from the image URL
        return base64Data;
      });

      const entryData = {
        email: email,
        text_content: text,
        images: encodedImages,
        open_date: openDate,
        entry_title: title, // Use the title value from the state
      };

      const response = await postNewEntry(entryData);
      console.log('Post New Entry Response:', response);
    } catch (error) {
      console.error('Post New Entry Error:', error.message);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Type something"
            value={text}
            onChange={handleTextChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            label="Select Date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button component="span" variant="contained">
              Upload Image
            </Button>
          </label>
          <Button variant="contained" onClick={handleClearImages}>
            Clear Images
          </Button>
          <Button variant="contained" onClick={handleSaveJournalEntry}>
            Save Journal Entry
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                style={{ width: '200px', height: 'auto', marginRight: '10px' }}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
