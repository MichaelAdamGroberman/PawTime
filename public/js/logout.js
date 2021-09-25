const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    // indicating that the request format body is JSON
    headers: { 'Content-Type': 'application/json' },
  });

  // response.ok is a Boolean stating whether the response was successful or not
  if (response.ok) {
    // should return true if succeeded
    console.log(response.ok);

    document.location.replace('/');
  } else {
    console.log(response.statusText);

    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
