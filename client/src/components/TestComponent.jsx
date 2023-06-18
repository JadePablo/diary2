import React, { useEffect } from 'react';
import {
  postNewEntry,
  updateOnlineStatus,
  getJournalEntries,
} from '../api.js'; // Update the path to match the location of your API file

const TestComponent = () => {
  useEffect(() => {
    // Test the postNewEntry function
    const testPostNewEntry = async () => {
      try {
        const entryData = {
          email: 'example@example.com',
          text_content: 'This is a test journal entry',
          images: ['image1.jpg', 'image2.jpg'],
          open_date: '2023-06-18',
          entry_title: 'Test Entry',
        };
        const response = await postNewEntry(entryData);
        console.log('Post New Entry Response:', response);
      } catch (error) {
        console.error('Post New Entry Error:', error.message);
      }
    };

    // Test the updateOnlineStatus function
    const testUpdateOnlineStatus = async () => {
      try {
        const email = 'example@example.com';
        const response = await updateOnlineStatus(email);
        console.log('Update Online Status Response:', response);
      } catch (error) {
        console.error('Update Online Status Error:', error.message);
      }
    };

    // Test the getJournalEntries function
    const testGetJournalEntries = async () => {
      try {
        const email = 'example@example.com';
        const response = await getJournalEntries(email);
        console.log('Get Journal Entries Response:', response);
      } catch (error) {
        console.error('Get Journal Entries Error:', error.message);
      }
    };

    // Call the test functions
    testPostNewEntry();
    testUpdateOnlineStatus();
    testGetJournalEntries();
  }, []);

  return (
    <div>
      <h1>API Test Component</h1>
      <p>Please check the browser console for the API function test results.</p>
    </div>
  );
};

export default TestComponent;
