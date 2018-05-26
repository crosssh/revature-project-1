import express from 'express';
import { Request, Response, NextFunction } from 'express';

export const reimbursementRouter = express.Router();

let reimbursements = [
    {
        username: 'jimjam',
        timeSubmitted: Date.now(),
        items: [
            'title1', 50, 'thist was an reimbursement', Date.now()
        ],
        approver: 'smcross',
        status: 'approved'
    },
    {
        username: 'bigGuy',
        timeSubmitted: Date.now(),
        items: [
            'title1', 50, 'thist was an reimbursement', Date.now()
        ],
        approver: 'smcross',
        status: 'approved'
    },
    {
        username: 'littleGuy',
        timeSubmitted: Date.now(),
        items: [
            'title1', 50, 'thist was an reimbursement', Date.now()
        ],
        approver: 'smcross',
        status: 'denied'
    },
]

reimbursementRouter.get('/username/:username', (req: Request, resp: Response) => {
    const username = req.params.username;
    console.log(`getting reimbursement for ${username}.`);
    for (let r of reimbursements) {
        if (r.username === username) {
            resp.json(r);
        }
    }
});

reimbursementRouter.get('/status/:status', (req: Request, resp: Response) => {
    const status = req.params.status;
    console.log(`getting the reimbursements for status: ${status}`);
    let rStatus = [];
    for (let r of reimbursements) {
        if (r.status === status) {
            rStatus.push(r);
        }
    }
    resp.json(rStatus);
})