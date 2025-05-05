import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countries';
import usersRouter from './routes/users';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/meli-countries', countriesRouter);
app.use('/api/meli-users', usersRouter);

app.get('/', (_req, res) => {
  res.send('Servidor encendido correctamente');
});

app.listen(port, () => {
  console.log(`Servidor encendido en http://localhost:${port}`);
});
