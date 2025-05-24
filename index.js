import express, { json } from 'express';
import { config } from 'dotenv';
import  router  from './routes/schoolRoute.js'

config();
const app = express();
app.use(json());

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
