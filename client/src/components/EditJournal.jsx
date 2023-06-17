import React, { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useHandleVisitor(username) {
    const navigate = useNavigate();
    const name = useSelector((state) => state.login.name);
    console.log(`state name: ${name}`)
    console.log(`parameter name: ${username}`)
    React.useEffect(() => {
      if (name !== username || name == null) {
        navigate('/');
      }
    }, [name, username, navigate]);
  }
  


export default function EditJournal() {

  const { username } = useParams();
  useHandleVisitor(username);

  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
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

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Type something"
            value={text}
            onChange={handleTextChange}
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
