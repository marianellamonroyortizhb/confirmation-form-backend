import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const usersRouter = Router();

type User = {
  token: string;
  fullname?: string;
  country?: string;
  region?: string;
  city?: string;
  address?: string;
  addressDetail?: string;
  addressType?: string;
  acceptTerms?: boolean;
};

usersRouter.get('/', (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  const filePath = path.resolve('src/data/meli-users.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error de lectura de meli-users.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    try {
      const users = JSON.parse(data);
      const user = users.find((u: { token: string }) => u.token === token);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      console.log('Usuario encontrado:', user);
      res.json(user);
    } catch (parseError) {
      console.error('Error en parse de meli-users.json:', parseError);
      res.status(500).json({ error: 'Error al procesar los datos' });
    }
  });
});

usersRouter.post('/', (req: Request, res: Response) => {
  const updatedUser = req.body;
  const { token } = updatedUser;

  if (!token) {
    return res.status(400).json({ error: 'Token requerido' });
  }

  const filePath = path.resolve('src/data/meli-users.json');
  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    users = JSON.parse(content);
  }

  const index = users.findIndex((u) => u.token === token);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
  } else {
    users.push(updatedUser);
  }

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.status(200).json({ message: 'Usuario actualizado correctamente' });
});

export default usersRouter;
