import express from 'express';
import { decodeToken, post_newEntry, update_OnlineStatus, get_JournalEntries } from './controller.js';

const router = express.Router();

router.get("/decode", decodeToken);
router.post("/upload", post_newEntry);
router.put("/online-status", update_OnlineStatus);
router.get("/journal-entries", get_JournalEntries);

export default router;
