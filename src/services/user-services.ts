import * as userDao from '../dao/user-dao';

export function saveUser(user) {
    return userDao.saveUser(user);
}

export function findUser(username: string) {
    return userDao.findUser(username);
}

export function loginUser(username: string, password: string) {
    return userDao.loginUser(username, password);
}