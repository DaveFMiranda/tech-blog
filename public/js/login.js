const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const user = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log(user);
  console.log(password);

  if (user && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);
    console.log(response.status);

    try {
      const data = await response.json();
      console.log(data); // Log the parsed response data
    } catch (error) {
      console.log(error); // Log any error that occurs during JSON parsing
    }

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
