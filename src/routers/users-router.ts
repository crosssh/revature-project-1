import express from 'express';
import { Request, Response, NextFunction } from 'express';

export const usersRouter = express.Router();

let users = [
    {
        username: 'smcross',
        password: 'password',
        firstName: 'Shawn',
        lastName: 'Cross',
        email: 'smcross@email.com',
        role: 'employee'
    },
    {
        username: 'jimjam',
        password: 'pass',
        firstName: 'Jim',
        lastName: 'Jam',
        email: 'jimjam@email.com',
        role: 'customer'
    }
];

usersRouter.get('', (req: Request, resp: Response, next: NextFunction) => {
    console.log(`retrieving all users`);
    resp.json(users);
});

usersRouter.get('/username', (req: Request, resp: Response) => {
    console.log(`getting usernames`);
    let usernames = users.map((u) => u.username);
    resp.json(usernames);
});

usersRouter.get('/username/:username', (req: Request, resp: Response) => {
    const username = req.params.username
    console.log(`getting usernames ${username}`);
    for (let u of users) {
        if (u.username === username) {
            resp.json(u);
        }
    }
});

usersRouter.post('', (req: Request, resp: Response) => {
    console.log(`adding user: ${JSON.stringify(req.body)} to users`);
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName
        || !req.body.email || !req.body.role) {
        resp.sendStatus(400);
    } else {
        const u = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role
        }
        users.push(u);
        resp.sendStatus(201);
    }
});