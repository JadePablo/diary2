import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function JournalEntryPage({ entry, onClose }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        borderRadius: '8px',
      }}
    >

      <Box
        sx={{
          width: '80%',
          backgroundColor: 'white',
          padding: '2rem',
          color: 'black',
          borderRadius: '8px',
          textAlign: 'left',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: 24 }}>
          {entry.entry_title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {new Date(entry.date_created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
                <hr style={{ borderTop: '1px solid black', marginBottom: '1rem' }} /> {/* Line separator */}

        <Typography variant="body1" gutterBottom>
          {entry.text_content}
        </Typography>
        {entry.images.map((image, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <img
              src={`data:image/png;base64,${image}`}
              alt={`Image ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </div>
        ))}
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: '#f5f5f5',
            color: 'black',
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'black',
              color: 'white',
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default JournalEntryPage;
