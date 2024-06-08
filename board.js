document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            renderPost(post, index);
        });
    }

    function renderPost(post, index) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML =  `<button onclick="deletePost(${index})">Delete</button>`;
        postElement.innerHTML = ` <p class="rainbow-text">${post.content}</p>`;

        
        postsContainer.appendChild(postElement);
        postsContainer.appendChild(postElement);

    }

    function savePost(content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ content });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    window.deletePost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const deletedPosts = JSON.parse(localStorage.getItem('deletedPosts')) || [];
        
        const deletedPost = posts.splice(index, 1)[0];
        deletedPosts.push(deletedPost);

        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.setItem('deletedPosts', JSON.stringify(deletedPosts));
        
        loadPosts();
    }

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const content = document.getElementById('content').value;
        savePost(content);
        document.getElementById('content').value = '';
        loadPosts();
    });

    loadPosts();
});
