import axios from 'axios';

const URL = "http://localhost:5000";

// Function to handle login success and verify the token
async function handleLoginSuccess(token) {
  try {
    const response = await axios.get(`${URL}/decode`, {
      params: {
        credential: token.credential,
      },
    });
    const decodedToken = response.data;
    // Use the user information as needed
    return decodedToken;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// Function to post a new journal entry
async function postNewEntry(entryData) {
  try {
    const response = await axios.post(`${URL}/upload`, entryData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to post journal entry');
  }
}

// Function to update online status
async function updateOnlineStatus(email) {
  try {
    const response = await axios.put(`${URL}/online-status`, null, {
      params: {
        email,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update online status');
  }
}

// Function to get journal entries
async function getJournalEntries(email) {
  try {
    const response = await axios.get(`${URL}/journal-entries`, {
      params: {
        email,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve journal entries');
  }
}

export { handleLoginSuccess, postNewEntry, updateOnlineStatus, getJournalEntries };
