import express from 'express';
import emailRouter from './routes/email.routes';

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());

app.use('/email', emailRouter);

app.listen(PORT, () => {
  console.log(`Servicio de email corriendo en http://localhost:${PORT}`);
});