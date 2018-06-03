import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../services/reimbursement-services'

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
});

reimbursementRouter.post('/add-reimbursement', (req, resp, next) => {
    const reimbursement = req.body && req.body;

    const r = {
        username: reimbursement.username,
        timeSubmitted: Date.now(),
        items: reimbursement.items,
        approver: reimbursement.approver,
        status: reimbursement.status
    }

    reimbursementService.saveReimbursement(r)
            .then(data => {
                console.log(`user: ${r.username} was added a reimbursement ticket.`);
                resp.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
                resp.sendStatus(500);
            });
});