let items = [];

function addItem() {

  const title = document.getElementById('title-input').value;
  const amount = document.getElementById('amount-input').value;
  const time = document.getElementById('time-input').value;
  const description = document.getElementById('description-input').value;

  const body = document.getElementById('ticket-table-body');

  const row = document.createElement('tr'); // create <tr>
  let data = document.createElement('td'); // create <td>
  data.innerText = title; // assign value to the td
  row.appendChild(data); // append the td to the row
  data = document.createElement('td');
  data.innerText = amount;
  row.appendChild(data);
  data = document.createElement('td');
  data.innerText = time;
  row.appendChild(data);
  data = document.createElement('td');
  data.innerText = description;
  row.appendChild(data);
  body.appendChild(row); // append the row to the body
}

function submitTicket() {
  console.log('here');
  const title = document.getElementById('title-input').value;
  const amount = document.getElementById('amount-input').value;
  const time = document.getElementById('time-input').value;
  const description = document.getElementById('description-input').value;

  const numItems = document.getElementById('items-table').rows.length;

  let items = [];
  let item;

  for(let i = 0; i < numItems; i++) {
    item = {
      'title': document.getElementById('items-table').rows[i].cells[0],
      'amount': parseInt(document.getElementById('items-table').rows[i].cells[1]),
      'date': document.getElementById('items-table').rows[i].cells[2],
      'description': document.getElementById('items-table').rows[i].cells[4]
    }
    items.push(item);
  }

  const ticket = {
    username: '',
    timeSubmitted: '',
    items: items,
    approver: 'pending',
    status: 'pending',
  }

  fetch('http://localhost:3000/reimbursements/add-reimbursement', {
    body: JSON.stringify(ticket),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'POST'
  })
    .then(resp => {
      console.log(resp.status)
      if (resp.status === 401) {
        throw 'Invalid Credentials';
      }
      if (resp.status === 200) {
        console.log('in resp === 200')
        return resp.json();
      }
      throw 'Unable to login at this time, please try again later';
    })
    .then(data => {
      console.log('here');
      window.location = '../reimbursements/add-reimbursement';
    })
    .catch(err => {
      document.getElementById('error-message').innerText = err;
    })
}