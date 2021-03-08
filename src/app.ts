import express from 'express';
import cors from 'cors';
import './db/dbConnection';

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    const protocol = req.get('x-forwarded-proto');
    if (protocol !== 'https') {
      res.redirect(`https.://${req.hostname}${req.url}`);
    }
    next();
  });
}

export { app };
