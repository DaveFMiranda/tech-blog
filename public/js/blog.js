// Establishing variables to hold data to send to API routes. Some of these may or may not be necessary but I'm leaving them in in case they're needed, and they don't hurt anything.
const submitId = document.querySelector('#comment-submit');
const blogId = submitId.getAttribute('data-id');

const blogEditId = document.querySelector('#blog-edit');
const blogEdit = blogEditId.getAttribute('data-id');

const blogDeleteId = document.querySelector('#blog-delete');
const blogDelete = blogDeleteId.getAttribute('data-id');

const commentId = document.querySelector('#comment-delete');

// Function to submit a new comment
const newFormHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, blogId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/blogs/${blogId}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

// Function to edit a blog post
const editButtonHandler = async (event) => {
  event.preventDefault();

  // Sets up variables to switch from viewing the old content to viewing a new input field.
  const oldContent = document.querySelector('#blog-content');
  const newContent = document.querySelector('#blog-update');
  oldContent.style.display = 'none';
  newContent.style.display = 'block';
  newContent.focus();

  // Makes the submit edit button visible and calls its function on click.
  const submitEditButton = document.querySelector('#edit-submit');
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editContentSubmission);
};

// Function to submit edits to a blog post.
const editContentSubmission = async (event) => {
  event.preventDefault();
  const newContent = document.querySelector('#blog-update').value.trim();

  if (newContent) {
    let content = newContent;
    const response = await fetch(`/api/blogs/${blogEdit}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blogs/${blogEdit}`);
    } else {
      alert('Failed to edit blog entry');
    }
  }
};

// Function to delete a blog post.
const delButtonHandler = async (event) => {
  const response = await fetch(`/api/blogs/${blogDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    // Change this to redirect to /profile
    document.location.replace(`/profile`);
  } else {
    alert('Failed to delete blog entry');
  }
};

// Function to delete a comment.
const delButtonHandler2 = async (event) => {
  const commentId = event.target.getAttribute('data-id');
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/blogs/${blogDelete}`);
  } else {
    alert('Failed to delete comment');
  }
};

// Event listeners to point to buttons and trigger their associated functions.
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#blog-edit')
  .addEventListener('click', editButtonHandler);

document
  .querySelector('#blog-delete')
  .addEventListener('click', delButtonHandler);

// Loops through all comments if there are any and adds event listeners to each comment's delete button.
const commentDeleteButtons = document.querySelectorAll('.comment-list');
if (commentDeleteButtons) {
  commentDeleteButtons.forEach((commentDeleteButton) => {
    commentDeleteButton.addEventListener('click', delButtonHandler2);
  });
}
