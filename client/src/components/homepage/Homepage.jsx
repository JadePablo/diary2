//import modules from dependencies
import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//modules to load entries from api
import { getJournalEntries } from '../../api.js'; 

//sub components
import HomepageHeader from './homepageComponents/HomepageHeader.jsx';
import JournalEntryPage from './homepageComponents/JournalEntryPage.jsx';
import JournalCard from './homepageComponents/JournalCard.jsx';

function useHandleVisitor(username) {
  const navigate = useNavigate();
  const name = useSelector((state) => state.login.name);

  useEffect(() => {
    if (name !== username || name == null) {
      navigate('/');
    }
  }, [name, username, navigate]);
}


export default function Homepage() {
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

  React.useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const currentDate = new Date();

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <HomepageHeader handleCreateClick={handleCreateClick}/>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {journalEntries.map((entry) => (
              <Grid item key={entry.id} xs={12} sm={6} md={4}>
                <JournalCard
                  entry={entry}
                  currentDate={currentDate}
                  handleViewEntry={handleViewEntry}
                />
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
