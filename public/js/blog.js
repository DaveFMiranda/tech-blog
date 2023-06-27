console.log('hello!');
const submitId = document.querySelector('#comment-submit');
const blogId = submitId.getAttribute('data-id');
console.log(blogId);

const blogEditId = document.querySelector('#blog-edit');
const blogEdit = blogEditId.getAttribute('data-id');
console.log(blogEdit);

const blogDeleteId = document.querySelector('#blog-delete');
const blogDelete = blogDeleteId.getAttribute('data-id');
console.log(blogDelete);
const commentId = document.querySelector('#comment-delete');


const newFormHandler = async (event) => {
  event.preventDefault();
  // TO DO: update querySelectors to match names in the views. Also remove "needed funding"
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const content = document.querySelector('#comment-content').value.trim();
  console.log(content);

  // Make sure the fetch route is accurate and make sure the fields after body: below match the model you're trying to update
  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, blogId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
console.log(content, blogId);
    // Update alert below
    if (response.ok) {
      document.location.replace(`/blogs/${blogId}`);
      console.log(blogId);
    } else {
      alert('Failed to create comment');
    }
  }
};

const editButtonHandler = async (event) => {
  event.preventDefault();
  // TO DO: make sure the route below is correct
  
  
  const oldContent = document.querySelector('#blog-content');
  const newContent = document.querySelector('#blog-update');
oldContent.style.display = 'none';
newContent.style.display = 'block';
newContent.focus();
  console.log(newContent);

  const submitEditButton = document.querySelector('#edit-submit');
  submitEditButton.style.display = 'block';
  submitEditButton.addEventListener('click', editContentSubmission);
};

const editContentSubmission = async (event) => {
  event.preventDefault();
  const newContent = document.querySelector('#blog-update').value.trim();
  console.log(newContent);

if (newContent) {

let content = newContent;
console.log(content);
  const response = await fetch(`/api/blogs/${blogEdit}`, {
    method: 'POST',
    body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
  });

  console.log(blogEdit);

  if (response.ok) {
    // Change this to redirect to /profile
    document.location.replace(`/blogs/${blogEdit}`);
  } else {
    alert('Failed to edit blog entry');
  }
};
};





const delButtonHandler = async (event) => {
    // TO DO: make sure the route below is correct
    const response = await fetch(`/api/blogs/${blogDelete}`, {
      method: 'DELETE',
    });

console.log(blogDelete);



    if (response.ok) {
      // Change this to redirect to /profile
      document.location.replace(`/profile`);
    } else {
      alert('Failed to delete blog entry');
    }
  
};

const delButtonHandler2 = async (event) => {
    const commentId = event.target.getAttribute('data-id');
console.log(commentId);
    // TO DO: make sure the route below is correct
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });




    // TO DO: update alert
    if (response.ok) {
      document.location.replace(`/blogs/${blogDelete}`);
    } else {
      alert('Failed to delete comment');
    }
  
};

// TO DO: make sure querySelectors match handlebars docs
document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);

  document
  .querySelector('#blog-edit')
  .addEventListener('click', editButtonHandler);

document
  .querySelector('#blog-delete')
  .addEventListener('click', delButtonHandler);



  const commentDeleteButtons = document.querySelectorAll('.comment-list');
if (commentDeleteButtons) {
  commentDeleteButtons.forEach(commentDeleteButton => {
    commentDeleteButton.addEventListener('click', delButtonHandler2);

  }
    
    )

};

  