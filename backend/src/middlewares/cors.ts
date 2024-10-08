import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://grackle-able-certainly.ngrok-free.app',
    'https://librero-lis.pages.dev',
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,POST,PUT,DELETE',
};

export default cors(corsOptions);
