import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../services/reimbursement-services'
import { authMiddleware } from '../security/auth-middleware';

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

reimbursementRouter.get('/username', (req: Request, resp: Response) => {
    console.log(`getting reimbursement for ${req.session.username}.`);
    reimbursementService.getEmployeeReimbursement(req.session.username)
        .then(data => {
            console.log(data.Items);
            resp.json(data.Items);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        });
});

reimbursementRouter.get('/status/:status', [
    authMiddleware('finance manager'),
    (req, resp, next) => {
        const status = req.params.status;
        console.log(`getting the reimbursements for status: ${status}`);
        reimbursementService.getReimbursmentByStatus(status)
            .then(data => {
                resp.json(data.Items);
            })
            .catch(err => {
                console.log(err);
                resp.sendStatus(500);
            })
    }
]);

reimbursementRouter.post('/add-reimbursement', (req, resp, next) => {
    const reimbursement = req.body && req.body;

    const r = {
        username: req.session.username,
        timeSubmitted: Date.now(),
        items: reimbursement.items,
        approver: reimbursement.approver,
        status: reimbursement.status
    }

    reimbursementService.saveReimbursement(r)
        .then(data => {
            console.log(`user: ${r.username} has added a reimbursement ticket.`);
            resp.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            resp.sendStatus(500);
        });
});

reimbursementRouter.post('/update-status', (req, resp) => {
    const approver = req.session.username;
    const username = req.body.username;
    const timeSubmitted = parseInt(req.body.timeSubmitted);
    const status = req.body.status;

    reimbursementService.updateStatus(status, username, approver, timeSubmitted)
    .then(data => {
        resp.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        resp.sendStatus(418);
    })
})