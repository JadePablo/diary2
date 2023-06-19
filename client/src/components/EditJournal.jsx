import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postNewEntry } from '../api.js';
import { DateTimePicker } from '@mui/lab';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography } from '@mui/material';

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
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'lightgrey',
    }}
  >
    <Typography
      variant="h4"
      component="h1"
      align="center"
      color="black"
      fontWeight="bold"
      sx={{ marginBottom: '2rem' }}
    >
      Write.
    </Typography>
      <Paper
        sx={{
          padding: '2rem',
          width: '100%',
          maxWidth: '600px',
          background: 'white',
        }}
      >
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
              label="Write here."
              value={text}
              onChange={handleTextChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            type="date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
            fullWidth
          />
          </Grid>
          <Grid item xs={12} sx={{textAlign:'center'}}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <Button component="span" variant="contained" color="inherit"
              sx={{
                bgcolor: '#f5f5f5', // Lighter gray background color
                color: 'black', // Dark shade of gray for the text
                borderRadius: '8px', // Rounded corners
                '&:hover': {
                  bgcolor: 'black', // Black background color on hover
                  color: 'white', // White text color on hover
                },
              }}
              >
                Upload Image
              </Button>
            </label>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleClearImages}
              sx={{
                bgcolor: '#f5f5f5', // Lighter gray background color
                color: 'black', // Dark shade of gray for the text
                borderRadius: '8px', // Rounded corners
                '&:hover': {
                  bgcolor: 'black', // Black background color on hover
                  color: 'white', // White text color on hover
                },
              }}
            >
              Clear Images
            </Button>

          </Grid>
          {images.length > 0 && (
            <Grid item xs={12}>
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                centerMode={true}
                centerSlidePercentage={50}
                dynamicHeight={false}
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      style={{
                        objectFit: 'cover',
                        height: '200px',
                        width: '100%',
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Button
        variant="contained"
        color="inherit"
        onClick={handleSaveJournalEntry}
        sx={{
          bgcolor: '#f5f5f5',
          color: 'black',
          borderRadius: '8px',
          marginTop: '1rem', // Add spacing to the top
          '&:hover': {
            bgcolor: 'black',
            color: 'white',
          },
        }}
      >
        Save Journal Entry
      </Button>
    </Box>
  );
}
