import bodyParser, { json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import router from './routes';
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';

// yarn ts-node-dev src/index.ts

const app = express();
const port = 5000;

app.use(cors());
app.use(json());
app.use(bodyParser.json());
app.use('/api', router);

// Обработка ошибок
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Приложение работает, порт: http://localhost:${port}`);
});
