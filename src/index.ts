import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import { usersRouter } from './routers/users-router';
import { reimbursementRouter } from './routers/reimbursement-router';
import * as reimbursementDao from './dao/reimbursement-dao';

const app = express();

const port = 3000;
app.set('port', port);


const sess = {
    secret: 'keyboard cat',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
};

// set up express to attach sessions
app.use(session(sess));

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
    express.static(path.join(__dirname, 'html'))
);

/**
 * this is a catch all
 */
app.use((req: Request, resp: Response, next: NextFunction) => {
    console.log(`request was made with url: ${req.path} 
    and type method: ${req.method}`);
    next();
});


app.use(bodyParser.json());
/*****************************************************************************
*
*****************************************************************************/

app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port, () => {
    console.log(`app is running at http//localhost:${app.get('port')}`);
});