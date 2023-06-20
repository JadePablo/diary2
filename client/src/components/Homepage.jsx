import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJournalEntries } from '../api.js'; // Update the path to match the location of your API file

function useHandleVisitor(username) {
  const navigate = useNavigate();
  const name = useSelector((state) => state.login.name);

  React.useEffect(() => {
    if (name !== username || name == null) {
      navigate('/');
    }
  }, [name, username, navigate]);
}

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



export default function Homepage(props) {
  const { username } = useParams();
  useHandleVisitor(username);

  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate(`/${username}/create`);
  };

  const email = useSelector((state) => state.login.email);
  const [journalEntries, setJournalEntries] = React.useState([]);
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
  };

  const handleCloseEntry = () => {
    setSelectedEntry(null);
  };

  React.useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const entries = await getJournalEntries(email);
        setJournalEntries(entries.reverse());
      } catch (error) {
        console.error('Failed to retrieve journal entries:', error.message);
      }
    };

    fetchJournalEntries();
  }, [email]);

  const currentDate = new Date();

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hey,
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              your entries are below.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            <Button
              variant="contained"
              onClick={handleCreateClick}
              sx={{
                bgcolor: 'lightgrey',
                color: 'black',
                '&:hover': {
                  bgcolor: 'black',
                  color: 'white',
                },
              }}
            >
              +
            </Button>
              
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {journalEntries.map((entry) => (
              <Grid item key={entry.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'lightgrey', // Set the background color to light grey
                    color: 'black', // Set the text color to black
                  }}
                >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    backgroundImage: `url(data:image/png;base64,${entry.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                  }}
                />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      color: 'black', // Set the text color to black
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: 20, color: 'black' }}>
                      {entry.entry_title} {/* Use the title from the entry */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(entry.date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentDate >= new Date(entry.open_date)
                        ? `Available on: ${new Date(entry.open_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}`
                        : 'Not available yet'}
                    </Typography>
                  </CardContent>
                  {currentDate >= new Date(entry.open_date) && (
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleViewEntry(entry)}
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
                        View
                      </Button>
                    </CardActions>

                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {selectedEntry && (
        <JournalEntryPage entry={selectedEntry} onClose={handleCloseEntry} />
      )}
    </ThemeProvider>
  );
}
