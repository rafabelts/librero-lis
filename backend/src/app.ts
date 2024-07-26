import express from 'express';
import bookRoutes from './routes/bookRoutes';
import cors from './middlewares/cors';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors);
app.use(express.json());

app.use('/api/books', bookRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at: http://localhost:${PORT}`)
);
