//modules from external libraries
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postNewEntry } from '../../api.js';
import { Typography } from '@mui/material';
import pica from 'pica';

//sub components
import TitleInput from './editJournalComponents/TitleInput.jsx';
import TextInput from './editJournalComponents/TextInput.jsx';
import DateInput from './editJournalComponents/DateInput.jsx';
import ImageUpload from './editJournalComponents/ImageUpload.jsx';
import ClearImageButton from './editJournalComponents/ClearImageButton.jsx';
import SaveButton from './editJournalComponents/SaveButton.jsx';

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
  const navigate = useNavigate();
  useHandleVisitor(username);

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

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
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImage('');
  };

  const handleSaveJournalEntry = async () => {
    if (!title || !text || !openDate) {
      setShowPrompt(true);
      return;
    }

    try {
      const base64Data = image.split(',')[1];
      const entryData = {
        email: email,
        text_content: text,
        image: base64Data,
        open_date: openDate,
        entry_title: title,
      };

      const response = await postNewEntry(entryData);
      console.log('Post New Entry Response:', response);

      navigate(`/homepage/${username}`); // Navigate back to the homepage with the specified route
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
            <TitleInput title={title} handleTitleChange={handleTitleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextInput text={text} handleTextChange={handleTextChange} />
          </Grid>

          <Grid item xs={12}>
            <DateInput openDate={openDate} handleDateChange={setOpenDate} />
          </Grid>

          {image ? (
            <ClearImageButton handleClearImage={handleClearImage} image={image} />
          ) : (
            <ImageUpload handleImageUpload={handleImageUpload} />
          )}

          {showPrompt && (
            <Grid item xs={12}>
              <Typography variant="body1" color="black">
                title. content. date. make sure they aren't empty. then submit.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
      <SaveButton handleSaveJournalEntry={handleSaveJournalEntry} />

    </Box>
  );
}
