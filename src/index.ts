import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './routers/users-router';
import { reimbursementRouter } from './routers/reimbursement-router';

const app = express();

const port = 3000;
app.set('port', port);

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