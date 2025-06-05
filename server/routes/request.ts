import express from 'express';
import { createRequest, getRequests, markResolved } from '../controllers/requestController';
import { authenticateToken } from '../middleware/authenticationMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createRequest);
router.get('/', authenticateToken, getRequests);
router.patch('/:id/resolve', authenticateToken, markResolved);

export default router;
