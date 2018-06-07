import * as reimbursementDao from '../dao/reimbursement-dao';

export function saveReimbursement(reimbursement) {
    return reimbursementDao.saveReimbursement(reimbursement);
}

export function getEmployeeReimbursement(username: string) {
    return reimbursementDao.getEmployeeReimbursement(username);
}

export function getReimbursmentByStatus(status: string, username: string) {
    return reimbursementDao.getReimbursementByStatus(status, username);
}

export function updateStatus(status: string, username: string ,approver: string, timeSubmitted: number) {
    return reimbursementDao.updateStatus(status, username, approver, timeSubmitted);
}