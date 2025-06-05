import express, { Request, Response } from 'express';
import requestsRoute from './routes/request';
import analyzeRoute from './routes/analyze';
import authRoute from './routes/authenticate'

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Working properly');
});

app.use('/requests', requestsRoute);
app.use('/analyze', analyzeRoute);
app.use('/auth', authRoute);

export default app;
