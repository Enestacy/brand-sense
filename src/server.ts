import express from 'express';
const app = express();
import bp from 'body-parser';
import cors from 'cors';
import recursive from 'recursive-readdir-sync';
import dotenv from 'dotenv';

dotenv.config();
app.use(cors({ origin: '*' }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server listening on port ${process.env.PORT}`);
});

// collect controllers recursively
recursive(`${__dirname}/routes`).forEach((file) => app.use('/', require(file)));
