import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:3000', 'https://noter-eosin.vercel.app'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,POST,PUT,DELETE',
};

export default cors(corsOptions);
