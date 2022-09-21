import express, { Application } from 'express';
import session from './api/middleware/session';
import path from 'path';
import cookieParser from 'cookie-parser';
import corsMiddleware from './api/middleware/cors';
import router from './api/routes';
import db from './database/models';
// var cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const app: Application = express();
app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./client_app/build")));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup CORS Logic
app.options('*', corsMiddleware);
app.use(corsMiddleware);

// Setup session middleware with Redis storage
app.use(session);

// Connecting routes
app.use(router);

app.get("*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, './client_app/build/index.html'));
});

db.sequelize.sync().then(() => {
    app.listen(PORT || 3000, () => {
        console.log('Server is listening on port', process.env.PORT || 3000)
    });
});

export default app;
