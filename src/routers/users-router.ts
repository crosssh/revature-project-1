import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user-services';
import { findUser } from '../dao/user-dao';

export const usersRouter = express.Router();

usersRouter.get('/username/:username', (req: Request, resp: Response) => {
    const username = req.params.username
    console.log(`getting usernames ${username}`);
    userService.findUser(username)
        .then(data => {
            resp.json(data.Items);
        })
        .catch(err => {
            resp.json(500);
        });
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

        userService.saveUser(u)
            .then(data => {
                console.log(`user: ${u.username} was added to the database.`);
                resp.sendStatus(200);
            })
            .catch(err => {
                resp.sendStatus(500);
            });
    }

});

usersRouter.post('/login', (req: Request, resp: Response) => {
    if (!req.body.username || !req.body.password) {
        resp.sendStatus(400);
    } else {
        userService.findUser(req.body.username)
            .then(data => {
                if (req.body.password === data.Items[0].password) {
                    console.log('Logged in')
                    req.session.role = data.Items[0].role;
                    req.session.username = data.Items[0].username;
                    resp.send(data.Items[0]);
                } else {
                    console.log('Incorrect password.');
                    resp.sendStatus(401);
                }
            })
            .catch(err => {
                console.log(`Incorrect username`);
                resp.sendStatus(401);
            });
    }
});
