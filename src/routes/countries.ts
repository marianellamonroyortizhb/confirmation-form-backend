import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const countriesRouter = Router();

countriesRouter.get('/', (_req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../data/meli-countries.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error de lectura de meli-countries.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    try {
      const countries = JSON.parse(data);
      console.log('Información de paises cargada:', countries);
      res.json(countries);
    } catch (parseError) {
      console.error('Error en parse de meli-countries.json:', parseError);
      res.status(500).json({ error: 'Error al procesar los datos' });
    }
  });
});

export default countriesRouter;
