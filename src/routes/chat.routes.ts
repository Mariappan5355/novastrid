import express from 'express';
import { upload, handleChatImport, handleTaskFiltering } from '../controllers/chat.controller';
import { verifyToken } from '../middlewares/verifytoken.middleware';

const router = express.Router();

router.post('/import-chat', verifyToken, upload.single('file'), handleChatImport);
router.get('/tasks', verifyToken,  handleTaskFiltering);

export default router;
