const blogModule = (function() {
    // Get the list of posts from localStorage 
    let posts = JSON.parse(localStorage.getItem('posts')) || [
      {
        index: 0,
        title: 'Post 1',
        date: '2023-03-01',
        summary: 'First post on my blog',
      },
      {
        index: 1,
        title: 'Post 2',
        date: '2023-03-02',
        summary: 'Second post on my blog',
      },
    ];
    
    // Save the list of posts to localStorage
    function savePosts() {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    // Update the HTML to display the list of posts
    function updatePostsHTML() {
      const list = document.querySelector('#post-list');
      list.innerHTML = '';
      
      for (const post of posts) {
        const item = document.createElement('li');
        item.innerHTML = `
        <div class="post">
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p class="summary">${post.summary}</p>
        <div class="actions">
        <button class="edit-btn" data-index="${post.index}"><img src="pencil-64x64.png" alt="Pencil icon" width="16px"></button>
        <button class="delete-btn" data-index="${post.index}"><img src="trash-64x64.png" alt="Trash can icon" width="16px"></button>
        </div>
        </div>
        `;
        list.appendChild(item);
      }
      
      attachEventListeners();
    }
    
    function showPostModal(post = null) {
      const modal = document.querySelector('#post-dialog');
      const form = modal.querySelector('form');
      const titleInput = form.querySelector('#post-title');
      const dateInput = form.querySelector('#post-date');
      const summaryInput = form.querySelector('#post-summary');
      
      if (post) {
        // Editing an existing post
        titleInput.value = post.title;
        dateInput.value = post.date;
        summaryInput.value = post.summary;
      } else {
        // Adding a new post
        titleInput.value = '';
        dateInput.value = '';
        summaryInput.value = '';
      }
      
      // Show the modal
      modal.style.display = 'block';
      
      // Handle the form submission
      function handleSubmit(event) {
        event.preventDefault();
        
        const title = titleInput.value.trim();
        const date = dateInput.value;
        const summary = summaryInput.value.trim();
        
        if (!title || !date || !summary) {
          alert('Please fill in all fields');
          return;
        }
        
        if (post) {
          // Editing an existing post
          post.title = title;
          post.date = date;
          post.summary = summary;
        } else {
          // Adding a new post
          const index = posts.length;
          const newPost = { index, title, date, summary };
          posts.push(newPost);
        }
        
        // Save the updated list of posts and update the HTML
        savePosts();
        updatePostsHTML();
        
        // Hide the modal
        modal.style.display = 'none';
        
        // Remove the event listener
        form.removeEventListener('submit', handleSubmit);
      }
      
      // Handle the form submission
      form.addEventListener('submit', handleSubmit);
      
      // Handle the Cancel button click
      const cancelButton = document.querySelector('#cancel');
      cancelButton.addEventListener('click', function() {
        modal.style.display = 'none';
        // Remove the event listener
        form.removeEventListener('submit', handleSubmit);
      });
    }
    
    // Attach event listeners to the edit and delete buttons
    function attachEventListeners() {
      const editButtons = document.querySelectorAll('.edit-btn');
      const deleteButtons = document.querySelectorAll('.delete-btn');
      
      // Attach event listener to edit buttons
      editButtons.forEach((button) => {
        button.addEventListener('click', function() {
          const index = parseInt(button.dataset.index);
          const post = posts.find((post) => post.index === index);
          showPostModal(post);
        });
      });
      
      // Attach event listener to delete buttons
      deleteButtons.forEach((button) => {
        button.addEventListener('click', function() {
          const index = parseInt(button.dataset.index);
          const postIndex = posts.findIndex((post) => post.index === index);
          posts.splice(postIndex, 1);
          savePosts();
          updatePostsHTML();
        });
      });
      
    }
    
    // Initialize event listeners
    updatePostsHTML();
    
    // Return the public API
    return {
      showPostModal,
    };
  })();
  
  // Attach event listener to the add button
  const addButton = document.querySelector('#add-post-btn');
  addButton.addEventListener('click', function() {
    blogModule.showPostModal();
  });
  