import express from 'express';
const app = express();

const PORT = process.env.PORT || 3030;

app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server listening at: http://localhost:${PORT}`)
);
