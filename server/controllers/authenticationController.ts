import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash });
  await newUser.save();

  res.status(201).json({ message: 'User registered' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '2h' });
  res.json({ token });
};
