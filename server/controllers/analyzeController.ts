import { Request, Response } from 'express';
import { mockAnalyzeMessage } from '../services/analyzerService';

export const analyze = (req: Request, res: Response) => {
  const { message } = req.body;
  const result = mockAnalyzeMessage(message);
  res.json(result);
};
