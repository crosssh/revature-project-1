import express from 'express';
import { Request, Response, NextFunction } from 'express';

export const usersRouter = express.Router();

let passwordHash = require('password-hash');

var bcrypt = require('bcrypt');
const saltRounds = 10;


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
        role: 'employee'
    },
    {
        username: 'admin',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@email.com',
        role: 'admin'
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
            password: passwordHash.generate(req.body.password),//passwordHash.generate(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role
        }
        console.log(u.password);
        users.push(u);
        resp.sendStatus(201);
    }

});

usersRouter.post('/login', (req: Request, resp: Response) => {
    if (!req.body.username || !req.body.password) {
        resp.sendStatus(400);
    } else {

        for (let u of users) {
            if (req.body.username === u.username && passwordHash.verify(req.body.password, u.password)) {
                console.log(`Logged In.`);
                resp.sendStatus(200);
            }
        }
    }
    // resp.sendStatus(418);
    console.log(`couldn't login`);
});
