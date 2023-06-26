import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
import dotenv from 'dotenv';

dotenv.config();

const EntrySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  text_content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  open_date: {
    type: Date,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  entry_title: {
    type: String,
  },
});

const secret = process.env.ENCRYPT_SECRET

EntrySchema.plugin(encrypt,{requireAuthenticationCode:false,secret:secret,encryptedFields:['text_content','entry_title']})

const Entry = mongoose.model('Entry', EntrySchema);

export default Entry
