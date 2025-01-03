import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const handleRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    await registerUser({ user_name, email, password });

    res.status(201).json({ message: "User registered successfully." });
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Internal server error during registration." });
    } else {
      res.status(500).json({ message: "Unexpected error occurred." });
    }
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const token = await loginUser(email, password);

    if (!token) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error });
  }
};
