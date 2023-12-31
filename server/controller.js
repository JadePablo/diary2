
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv'
import User from './models/User.js'
import Entry from './models/Entry.js'

dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID;

async function decodeToken(req, res) {

    const client = new OAuth2Client(CLIENT_ID);

    try {
        
        const token = req.query.credential
   
        if (!token) {
            return res.status(400).json({ error: 'Token not provided' });
        }

        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const decodedToken = {
          userId: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        };
    
        res.status(200).json(decodedToken);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to verify token' });
      }
}


/*db-associated controllers*/

//post journal entry
async function post_newEntry(req, res) {
  try {
    const { email, text_content, image, open_date, entry_title } = req.body;

    const images = [image]
    
    // Create a new entry document
    const newEntry = await Entry.create({
      email,
      text_content,
      images,
      open_date,
      entry_title,
    });

    res.status(201).json({ message: 'Journal entry created successfully', entry: newEntry });
  } catch (error) {
    console.error('Error:', error);
  }
}

// update last online status
async function update_OnlineStatus(req, res) {

  const email = req.query.email;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { lastActiveTime: new Date() },
      { new: true, upsert:true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update online status' });
  }
}

//get journal entries
async function get_JournalEntries(req, res) {

  const email = req.query.email; // Assuming 'email' is passed as a query parameter

  try {
    const entries = await Entry.find({ email });
    res.json(entries);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve journal entries' });
  }
}

export{decodeToken,post_newEntry,update_OnlineStatus,get_JournalEntries}