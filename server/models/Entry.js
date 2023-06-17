import mongoose from 'mongoose';

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

const Entry = mongoose.model('Entry', EntrySchema);

export default Entry
