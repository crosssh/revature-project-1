// import { Recoverable } from "repl";

function getEmployeeReimbursments() {
    fetch('http://localhost:3000/reimbursements/status/pending', { credentials: 'include' })
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
    let option = document.createElement('option');
    
    data.innerText = reimbursement.username; // assign value to the td
    row.appendChild(data); // append the td to the row
    data = document.createElement('td');
    data.innerText = reimbursement.timeSubmitted;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = reimbursement.approver;
    row.appendChild(data);
    data = document.createElement('td');
    //data.innerText = reimbursement.status;
    let select = document.createElement('select');
    select.setAttribute('id', 'select');
    select.options.add(new Option(reimbursement.status, reimbursement.status, false, true))
    let option = select.options.add(new Option('approved', 'approved', false, false));
    option.setAttribute('id', 'approved');
    option = select.options.add(new Option('denied', 'denied', false, false));
    option.setAttribute('id', 'denied');
    data.appendChild(select);

    row.appendChild(data);
    body.appendChild(row); // append the row to the body
    document.getElementById('select').addEventListener('change', updateStatus(this));
}

function updateStatus(status) {

//     const username = document.getElementById('username-input').value;
//     const password = document.getElementById('password-input').value;

//     const credential = {username, password}; 

//     fetch('http://localhost:3000/users/login', {
//     body: JSON.stringify(credential),
//     headers: {
//       'content-type': 'application/json'
//     },
//     credentials: 'include',
//     method: 'POST'
//   })
//   .then(resp => {
//     console.log(resp.status)
//     if (resp.status === 401) {
//       throw 'Invalid Credentials';
//     }
//     if (resp.status === 200) {
//       console.log('in resp === 200')
//       return resp.json();
//     }
//     throw 'Unable to login at this time, please try again later';
//   })
//   .then(data => {
//     console.log('here');
//     window.location = '../home/index.html';
//   })
//   .catch(err => {
//     document.getElementById('error-message').innerText = err;
//   })
}