
function getEmployeeReimbursments() {
    fetch('http://localhost:3000/reimbursements/status/approved', { credentials: 'include' })
        .then(resp => {
            console.log(resp.status)
            if (resp.status === 401 || resp.status === 403) {
                return;
            }
            return resp.json();
        })
        .then((reimbursements) => {
            const body = document.getElementById('reimbursement-table-body');
            body.innerHTML = '';

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

    const row = document.createElement('tr');
    let data = document.createElement('td');
    let option = document.createElement('option');

    data.innerText = reimbursement.username; 
    row.appendChild(data); 
    data = document.createElement('td');
    data.innerText = reimbursement.timeSubmitted;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = reimbursement.approver;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = reimbursement.status;
    row.appendChild(data);
    body.appendChild(row); 
}
