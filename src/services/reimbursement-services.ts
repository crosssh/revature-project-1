import * as reimbursementDao from '../dao/reimbursement-dao';

export function saveReimbursement(reimbursement) {
    return reimbursementDao.saveReimbursement(reimbursement);
}