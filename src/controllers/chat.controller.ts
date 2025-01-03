import { Request, Response } from 'express';
import multer from 'multer';
import { importChatData, getFilteredTasks } from '../services/chat.service';

const upload = multer({ dest: 'uploads/' });

const handleChatImport = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  try {
    await importChatData(req.file.path);
    res.status(200).json({ message: 'Chat data imported successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error importing chat data.', error });
  }
};

const handleTaskFiltering = async (req: Request, res: Response): Promise<void> => {
  const { filter } = req.query;

  try {
    const tasks = await getFilteredTasks(filter as string);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering tasks.', error });
  }
};

export { upload, handleChatImport, handleTaskFiltering };
