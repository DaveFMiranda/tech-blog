console.log('hello!');
const submitId = document.querySelector('#comment-submit');
const blogId = submitId.getAttribute('data-id');
console.log(blogId);
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

const delButtonHandler = async (event) => {
    // TO DO: make sure the route below is correct
    const response = await fetch(`/api/bites/${blogDelete}`, {
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
  .querySelector('#blog-delete')
  .addEventListener('click', delButtonHandler);

  const commentDeleteButton = document.querySelector('#comment-delete');
  if (commentDeleteButton && typeof delButtonHandler2 === 'function') {
    commentDeleteButton.addEventListener('click', delButtonHandler2);
  };
  