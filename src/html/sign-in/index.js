function signIn() {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    const credential = {username, password}; 

    fetch('http://localhost:3000/users/login', {
    body: JSON.stringify(credential),
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
    window.location = '../home/index.html';
  })
  .catch(err => {
    document.getElementById('error-message').innerText = err;
  })
}