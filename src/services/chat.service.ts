import xlsx from "xlsx";
import pool from "../database/connection";
import { Chat } from "../models/chat.model";
import { Task } from "../models/task.model";

const importChatData = async (filePath: string): Promise<void> => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const chatData: Chat[] = xlsx.utils.sheet_to_json(sheet);

  for (const chat of chatData) {
    const { user_id, message, timestamp } = chat;
    const formattedTimestamp = new Date(timestamp)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await pool.query(
      "INSERT INTO chat_history (user_id, message, timestamp) VALUES (?, ?, ?)",
      [user_id, message, formattedTimestamp]
    );
  }
};

const getFilteredTasks = async (filter: string | undefined): Promise<any[]> => {
  let query = "SELECT * FROM tasks";
  if (filter === "completed") query += ' WHERE status = "completed"';
  else if (filter === "pending") query += ' WHERE status = "pending"';

  const [rows] = await pool.query(query);

  const tasks: Task[] = rows as Task[];
  return tasks;
};

export { importChatData, getFilteredTasks };
