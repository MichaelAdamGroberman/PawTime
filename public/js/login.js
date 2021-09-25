// console.log('i am a taco');
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the landing page
      document.location.replace('/profile');
    } else {
      console.log(err);
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const zipCode = document.querySelector('#zipcode-signup').value.trim();

  if (name && email && password && zipCode) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, zipCode }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}

const signUpForm = document.querySelector('.signup-form');
if (signUpForm) {
  signUpForm.addEventListener('submit', signupFormHandler);
}
