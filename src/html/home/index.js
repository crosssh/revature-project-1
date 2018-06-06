// import { Recoverable } from "repl";

function getEmployeeReimbursments() {
    fetch('http://localhost:3000/reimbursements/username', { credentials: 'include' })
        .then(resp => {
            console.log(resp.status)
            if (resp.status === 401 || resp.status === 403) {
                return;
            }
            return resp.json();
        })
        .then((reimbursements) => {
            // clear table
            const body = document.getElementById('reimbursement-table-body');
            body.innerHTML = '';

            // populate the table for each movie
            reimbursements.forEach(addReimbursment);
        })
        .catch(err => {
            console.log(err);
            const body = document.getElementById('reimbursement-table-body');
            body.innerText = 'Unable to retreive data';
        })
}

window.onload = getEmployeeReimbursments;

function addReimbursment(reimbursement) {
    const body = document.getElementById('reimbursement-table-body');

    const row = document.createElement('tr'); // create <tr>
    let data = document.createElement('td'); // create <td>
    data.innerText = reimbursement.username; // assign value to the td
    row.appendChild(data); // append the td to the row
    data = document.createElement('td');
    data.innerText = reimbursement.timeSubmitted;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = reimbursement.approver;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = reimbursement.status;
    row.appendChild(data);
    body.appendChild(row); // append the row to the body
}