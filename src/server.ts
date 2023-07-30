import express from 'express'
import router from './api/v1/routes'
const app = express();
const bodyParser = express.json
 app.use(bodyParser());
 app.use(router)

export default app;