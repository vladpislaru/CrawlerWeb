import express, { Application, Router } from 'express';
import dbSyncService from './database/service/dbsync';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import bodyParser from "body-parser"
import loggedInAccount from './middleware/loggedInAccount';
import userRoutes from './routes/user';
import linkRoute from './routes/links';
const cors = require('cors');

dbSyncService.sync();

const app = express();
app.use(bodyParser.json())
app.use(cors())


const appScopedRoutes = Router();
appScopedRoutes.use("/login", loginRouter)
appScopedRoutes.use("/register", registerRouter)

const userScoperRoutes = Router();
userScoperRoutes.use(loggedInAccount);
userScoperRoutes.use("/users", userRoutes);
userScoperRoutes.use("/links", linkRoute);


app.use("/", appScopedRoutes);
app.use("/", userScoperRoutes);

app.listen(30080, () => {
    console.log('The application is listening on port 8080!');
})