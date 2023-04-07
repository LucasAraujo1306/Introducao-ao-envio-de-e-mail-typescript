import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './routes/api';


const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.get('/', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});