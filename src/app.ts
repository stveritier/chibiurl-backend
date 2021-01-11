import express from 'express';
import './db/dbConnection';

const app = express();

app.use(express.json());

export { app };
