import express from 'express';
import { analyze } from '../controllers/analyzeController';

const router = express.Router();
router.post('/', analyze);
export default router;
