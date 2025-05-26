import express, { json } from 'express';
import { config } from 'dotenv';
import  router  from './routes/schoolRoute.js'
import cors from 'cors'

config();
const app = express();
app.use(json());
app.use(cors())

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
