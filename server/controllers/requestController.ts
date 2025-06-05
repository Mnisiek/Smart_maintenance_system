import { Request, Response } from 'express';
import MaintenanceRequest from '../models/requestModel';
import { mockAnalyzeMessage } from '../services/analyzerService';

export const createRequest = async (req: Request, res: Response) => {
  try {
    const { tenantId, message } = req.body;
    if (!tenantId || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const analysis = mockAnalyzeMessage(message);
    const newRequest = new MaintenanceRequest({
      tenantId,
      message,
      priority: analysis.priority,
      analyzedFactors: analysis,
      resolved: false
    });

    await newRequest.save();
    res.status(201).json({ requestId: newRequest._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getRequests = async (req: Request, res: Response) => {
  const { priority } = req.query;
  const filter = priority ? { priority } : {};
  const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };

  const requests = await MaintenanceRequest.find(filter).lean();

  requests.sort((a, b) => {
    const pa = priorityOrder[a.priority as string] ?? 3;
    const pb = priorityOrder[b.priority as string] ?? 3;
    if (pa !== pb) return pa - pb;

    const ta = new Date(a.timestamp).getTime();
    const tb = new Date(b.timestamp).getTime();
    return tb - ta; // nowsze wyżej
  });

  res.json({ requests });
};



export const markResolved = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await MaintenanceRequest.findByIdAndUpdate(id, { resolved: true }, { new: true });
  res.json(updated);
};