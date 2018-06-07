
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
    let select = document.createElement('select');
    select.setAttribute('name', 'select');
    select.options.add(new Option(reimbursement.status, reimbursement.status, true, true));
    select.options.add(new Option('approved', 'approved', false, false));
    select.options.add(new Option('denied', 'denied', false, false));
    data.appendChild(select);

    row.appendChild(data);
    body.appendChild(row); 
}

function updateStatus() {
    const selects = document.getElementsByName('select');
    const tr = document.getElementsByTagName('tr');
    let i = 0;

    for (let select of selects) {
        let options = select.getElementsByTagName('option');
        for (let option of options) {
            if (option.selected && option.text !== 'pending') {
                console.log(`username: ${tr[i + 1].cells[0].textContent} time${tr[i + 1].cells[1].textContent} ${option.text}`);
                let status = {
                    username: tr[i + 1].cells[0].textContent,
                    timeSubmitted: tr[i + 1].cells[1].textContent,
                    status: option.text,

                };

                fetch('http://localhost:3000/reimbursements/update-status', {
                    body: JSON.stringify(status),
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include',
                    method: 'POST'
                })
                    .then(resp => {
                        if (resp.status === 200) {
                            return;
                        }
                        throw 'Unable to update status';
                    })
                    .then(data => {
                        return window.location = './index.html';;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
        i++;
    }
}