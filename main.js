const modal = document.getElementById('postModal');
const closeModal = document.querySelector('.closeModal');
const blogPosts = document.querySelector('.blogPosts');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalImage = document.getElementById('modalImage');

closeModal.addEventListener('click', () => {
    modal.close();
});

async function loadData() {
    try {
        const response = await fetch('./posts.json');
        const data = await response.json();

        createPosts(data);
    } catch (error) {
        console.error('Failed to load JSON:', error);
    }
}

function createPosts(posts) {
    blogPosts.innerHTML = '';

    posts.forEach(post => {
        if (post.published === true) {
            const postButton = document.createElement('button');
            postButton.classList.add('post');

            postButton.innerHTML = `
                <div class="boxes">
                    <img class="cardImage" src="${post.cardImage}" alt="${post.title}">
                    <h3>${post.title}</h3>
                    <p>${post.date}</p>
                </div>
            `;

            postButton.addEventListener('click', () => {
                modalTitle.textContent = post.title;
                modalContent.textContent = post.content;
                modalImage.src = post.modalImage;
                modalImage.alt = post.title;

                modal.showModal();
            });

            blogPosts.appendChild(postButton);
        }
    });
}

loadData();