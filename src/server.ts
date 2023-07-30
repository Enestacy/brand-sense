import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import recursive from 'recursive-readdir-sync';
import dotenv from 'dotenv';
import { Context } from './utils';
import openaiClient from './utils/openai-client';

declare global {
  namespace Express {
    interface Request<TBody = any> {
      context?: Context;
      body?: TBody;
    }
  }
}

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    openaiClient: openaiClient,
  };
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server listening on port ${process.env.PORT}`);
});

// collect controllers recursively
recursive(`${__dirname}/routes`).forEach((file) => app.use('/', require(file)));
