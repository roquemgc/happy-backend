import 'dotenv/config'; 
import express from 'express'
import path from 'path';
import cors from 'cors'

import 'express-async-errors';

import routes from './routes'
import errorHandler from './errors/handler'

import './database/connection'; // Conexão com banco de dados ORM

const app = express();

app.use(cors())
app.use(express.json()); // Sinaliza para o express que json será recebido de requisições
app.use(routes);
app.use(errorHandler);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.listen(process.env.PORT || 3333);

