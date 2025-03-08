document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const postsPerPage = 6;
    
    // Initialize main functionality
    loadBlogPosts();
    setupFilters();
    setupLoadMore();
    
    // Modal functionality
    const modal = document.getElementById('postFormModal');
    const addPostBtn = document.getElementById('addPostBtn');
    const cancelBtn = document.getElementById('cancelPost');
    const postForm = document.getElementById('postForm');

    // Show modal when Add Post button is clicked
    addPostBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // Hide modal when Cancel button is clicked
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        postForm.reset();
    });

    // Handle form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            id: Date.now(),
            title: document.getElementById('postTitle').value,
            content: document.getElementById('postContent').value,
            category: document.getElementById('postCategory').value,
            author: 'Current User',
            image: '/images/blog/default-post.jpg',
            createdAt: new Date().toISOString(),
            comments: []
        };

        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.unshift(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        
        // Reset form and close modal
        postForm.reset();
        modal.classList.remove('active');
        
        // Refresh the display
        document.getElementById('blogPosts').innerHTML = '';
        loadBlogPosts(1);
        showNotification('Blog post added successfully!');
    });

    // Close modal if clicked outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            postForm.reset();
        }
    });
});

let allPosts = [];

// Remove all the duplicate modal code at the bottom of the file (after sampleBlogPosts)
// Keep only the modal code inside DOMContentLoaded

// Modify the loadBlogPosts function to ensure proper display
async function loadBlogPosts(page = 1) {
    try {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        allPosts = posts;
        
        // Always clear the container before displaying posts
        const container = document.getElementById('blogPosts');
        container.innerHTML = '';
        
        displayBlogPosts(allPosts, page);
        updateCategories(allPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showNotification('Failed to load blog posts', 'error');
    }
}

// Add currentPage to the global scope
let currentPage = 1;
const postsPerPage = 6;

// Add function to update categories
function updateCategories(posts) {
    const categorySelect = document.getElementById('categoryFilter');
    const categories = [...new Set(posts.map(post => post.category))];
    
    categorySelect.innerHTML = `
        <option value="">All Categories</option>
        ${categories.map(category => `
            <option value="${category}">${category}</option>
        `).join('')}
    `;
}

function displayBlogPosts(posts, page) {
    const container = document.getElementById('blogPosts');
    container.innerHTML = ''; // Clear the container first
    
    const start = (page - 1) * postsPerPage;
    const paginatedPosts = posts.slice(start, start + postsPerPage);
    
    paginatedPosts.forEach(post => {
        const postElement = createBlogPostElement(post);
        container.appendChild(postElement);
    });

    // Hide load more button if no more posts
    const loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.style.display = posts.length <= start + postsPerPage ? 'none' : 'block';
}

function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    article.innerHTML = `
        <div class="blog-card-image">
            <img src="${post.image}" alt="${post.title}">
            <span class="blog-category">${post.category}</span>
        </div>
        <div class="blog-card-content">
            <h2>${post.title}</h2>
            <div class="blog-meta">
                <div class="author-info">
                    <img src="/images/default-avatar.png" alt="${post.author}" class="author-avatar">
                    <span>${post.author}</span>
                </div>
                <div class="post-info">
                    <span><i class="far fa-calendar"></i> ${new Date(post.createdAt).toLocaleDateString()}</span>
                    <span><i class="far fa-comment"></i> ${post.comments ? post.comments.length : 0}</span>
                </div>
            </div>
            <p>${post.content.substring(0, 150)}...</p>
            <div class="blog-card-footer">
                <a href="/blog/${post.id}" class="read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
                <div class="social-share">
                    <button class="share-btn facebook" onclick="shareBlog('facebook', '${post.id}')">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button class="share-btn twitter" onclick="shareBlog('twitter', '${post.id}')">
                        <i class="fab fa-twitter"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return article;
}

function setupFilters() {
    const searchInput = document.getElementById('searchBlog');
    const categorySelect = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', debounce(() => {
        filterBlogPosts();
    }, 300));
    
    categorySelect.addEventListener('change', () => {
        filterBlogPosts();
    });
}

function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadBlogPosts(currentPage);
    });
}

function filterBlogPosts() {
    const searchTerm = document.getElementById('searchBlog').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    const filteredPosts = allPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                            post.content.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || post.category === category;
        return matchesSearch && matchesCategory;
    });
    
    document.getElementById('blogPosts').innerHTML = '';
    displayBlogPosts(filteredPosts, 1);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function shareBlog(platform, postId) {
    const url = `${window.location.origin}/blog/${postId}`;
    const text = 'Check out this amazing blog post!';
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
}

// // Sample blog posts data
// // Move sample blog posts to the top
// const sampleBlogPosts = [
//     {
//         id: 1,
//         title: "Top 10 Summer Recipes",
//         content: "Discover refreshing recipes perfect for hot summer days. From vibrant salads to grilled favorites, these recipes will keep you cool and satisfied all summer long. Learn the secrets of perfect summer entertaining and create memorable meals for your family and friends.",
//         author: "Chef Maria",
//         category: "Seasonal Cooking",
//         image: "/images/blog/summer-recipes.jpg",
//         createdAt: "2024-01-15",
//         comments: []
//     },
//     {
//         id: 2,
//         title: "Essential Kitchen Tools Guide",
//         content: "Every home chef needs these essential tools in their kitchen. From quality knives to versatile pans, discover what tools are worth investing in. Make your cooking experience more efficient and enjoyable with the right equipment at your fingertips.",
//         author: "Kitchen Expert Tom",
//         category: "Kitchen Tips",
//         image: "/images/blog/kitchen-tools.jpg",
//         createdAt: "2024-01-10",
//         comments: []
//     },
//     {
//         id: 3,
//         title: "Healthy Meal Prep Ideas",
//         content: "Start your week right with these meal prep strategies. Save time and money while maintaining a healthy diet. Learn how to plan, portion, and store your meals effectively. These tips will revolutionize your weekly meal planning routine.",
//         author: "Nutritionist Sarah",
//         category: "Healthy Eating",
//         image: "/images/blog/meal-prep.jpg",
//         createdAt: "2024-01-05",
//         comments: []
//     }
// ];

// Initialize localStorage with sample data if empty
if (!localStorage.getItem('blogPosts')) {
    localStorage.setItem('blogPosts', JSON.stringify(sampleBlogPosts));
}

// Modal functionality
const modal = document.getElementById('postFormModal');
const addPostBtn = document.getElementById('addPostBtn');
const cancelBtn = document.getElementById('cancelPost');
const postForm = document.getElementById('postForm');

// Show modal when Add Post button is clicked
addPostBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// Hide modal when Cancel button is clicked
cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    postForm.reset();
});

// Handle form submission
postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPost = {
        id: Date.now(),
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        category: document.getElementById('postCategory').value,
        author: 'Current User',
        image: '/images/blog/default-post.jpg',
        createdAt: new Date().toISOString(),
        comments: []
    };

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.unshift(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    // Reset form and close modal
    postForm.reset();
    modal.classList.remove('active');
    
    // Refresh the display
    document.getElementById('blogPosts').innerHTML = '';
    loadBlogPosts(1);
    showNotification('Blog post added successfully!');
});

// Close modal if clicked outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        postForm.reset();
    }
});
