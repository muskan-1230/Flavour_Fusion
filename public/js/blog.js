// Initialize blog posts array
let blogPosts = [];
let currentPostId = null;

// Global variable to store the selected image
let selectedImageDataUrl = null;

// Sample data for initial blog posts (only used if localStorage is empty)
const sampleBlogPosts = [
    {
        id: 1,
        title: "10 Essential Knife Skills Every Home Cook Should Master",
        author: "Chef Maria",
        date: "June 15, 2023",
        category: "cooking-tips",
        tags: ["Cooking Tips", "Techniques"],
        image: "https://source.unsplash.com/random/600x400?cooking",
        content: "Learn the fundamental cutting techniques that will transform your cooking experience and help you prepare meals like a professional chef...",
        likes: 42,
        comments: [
            { author: "John Doe", date: "June 16, 2023", content: "Great tips! I've been trying to improve my knife skills." },
            { author: "Jane Smith", date: "June 17, 2023", content: "The julienne technique changed my salad game completely!" }
        ]
    },
    {
        id: 2,
        title: "The Art of Spice Blending: Create Your Own Signature Mixes",
        author: "Spice Expert Alex",
        date: "June 10, 2023",
        category: "ingredients",
        tags: ["Ingredients", "Spices"],
        image: "https://source.unsplash.com/random/600x400?spices",
        content: "Discover how to combine spices to create unique flavor profiles that will elevate your dishes and impress your guests with bold, balanced tastes...",
        likes: 38,
        comments: []
    }
];

// DOM Elements
const newPostModal = document.getElementById('newPostModal');
const editPostModal = document.getElementById('editPostModal');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const viewPostModal = document.getElementById('viewPostModal');

// Load blog posts from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const newPostModal = document.getElementById('newPostModal');
    const editPostModal = document.getElementById('editPostModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const viewPostModal = document.getElementById('viewPostModal');
    
    // Load saved posts from localStorage
    loadBlogPostsFromStorage();
    
    // Initialize blog posts display
    refreshBlogPosts();
    
    // Add event listeners
    setupEventListeners();

    // Set up search functionality
    const searchForm = document.getElementById('blogSearchForm');
    const searchInput = document.getElementById('blogSearchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchBlogPosts(searchTerm);
            } else {
                // If search is empty, show all posts
                refreshBlogPosts();
            }
        });
        
        // Add real-time search as user types (optional)
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            // Only search if we have at least 3 characters
            if (searchTerm.length >= 3) {
                searchBlogPosts(searchTerm);
            } else if (searchTerm.length === 0) {
                // If search is cleared, show all posts
                refreshBlogPosts();
            }
        });
    }
});

// Function to set up all event listeners
function setupEventListeners() {
    // New post button
    const newPostBtn = document.getElementById('newPostBtn');
    if (newPostBtn) {
        newPostBtn.addEventListener('click', openNewPostModal);
    }
    
    // New post form submission
    const newPostForm = document.getElementById('newPostForm');
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            publishPost();
        });
    }
    
    // Delete confirmation
    const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
    if (deleteConfirmBtn) {
        deleteConfirmBtn.addEventListener('click', function() {
            deletePost(currentPostId);
            closeDeleteConfirmModal();
        });
    }
    
    // Comment form submission
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addComment();
        });
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Function to load blog posts from localStorage
function loadBlogPostsFromStorage() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        try {
            blogPosts = JSON.parse(savedPosts);
            console.log('Loaded', blogPosts.length, 'posts from localStorage');
        } catch (error) {
            console.error('Error loading posts from localStorage:', error);
            blogPosts = [];
        }
    } else {
        blogPosts = [];
    }
}

// Function to save blog posts to localStorage
function saveBlogPostsToStorage() {
    try {
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        console.log('Saved', blogPosts.length, 'posts to localStorage');
    } catch (error) {
        console.error('Error saving posts to localStorage:', error);
    }
}

// Open new post modal
function openNewPostModal() {
    // Reset form fields
    document.getElementById('postTitle').value = '';
    document.getElementById('postCategory').value = 'recipes';
    document.getElementById('postTags').value = '';
    document.getElementById('postContent').value = '';
    
    // Reset image preview if it exists
    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
        imagePreview.style.display = 'none';
    }
    
    // Reset file input
    const imageInput = document.getElementById('postImage');
    if (imageInput) {
        imageInput.value = '';
    }
    
    // Reset selected image data URL
    selectedImageDataUrl = null;
    
    // Show the modal
    const modal = document.getElementById('newPostModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close new post modal
function closeNewPostModal() {
    const modal = document.getElementById('newPostModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Publish a new post
function publishPost() {
    // Get form values
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const tags = document.getElementById('postTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
    const imageInput = document.getElementById('postImage');
    const content = document.getElementById('postContent').value;
    
    // Validate required fields
    if (!title || !content) {
        alert('Title and content are required!');
        return;
    }
    
    // Handle the image file
    let imageUrl = 'https://picsum.photos/800/500'; // Default fallback
    
    // If a file is selected, create a data URL from it
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        
        // This is an async operation, so we need to handle it with a promise
        const imagePromise = new Promise((resolve) => {
            reader.onload = function(e) {
                resolve(e.target.result); // This is the data URL
            };
            reader.readAsDataURL(imageInput.files[0]);
        });
        
        // Wait for the image to be processed, then continue
        imagePromise.then((dataUrl) => {
            // Create new post object with the actual image
            createAndSavePost(title, category, tags, content, dataUrl);
        });
        
        return; // Exit early as we're handling this asynchronously
    }
    
    // If no image was selected, use the default and continue
    createAndSavePost(title, category, tags, content, imageUrl);
}

// Helper function to create and save a post
function createAndSavePost(title, category, tags, content, imageUrl) {
    // Create new post object
    const newPost = {
        id: Date.now(), // Use timestamp for unique ID
        title: title,
        author: "Current User",
        date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
        category: category,
        tags: tags,
        image: imageUrl,
        content: content,
        likes: 0,
        comments: []
    };
    
    // Add to blog posts array
    blogPosts.push(newPost);
    
    // Save to localStorage
    saveBlogPostsToStorage();
    
    // Update the UI
    refreshBlogPosts();
    
    // Close the modal
    closeNewPostModal();
    
    // Show success message
    alert('Blog post published successfully!');
}

// Delete a post
function deletePost(postId) {
    const index = blogPosts.findIndex(p => p.id === postId);
    if (index !== -1) {
        blogPosts.splice(index, 1);
        saveBlogPostsToStorage();
        refreshBlogPosts();
    }
}

// Confirm delete post
function confirmDeletePost(postId) {
    currentPostId = postId;
    document.getElementById('deleteConfirmModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close delete confirmation modal
function closeDeleteConfirmModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Open view post modal
function openViewPostModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    currentPostId = postId;
    
    // Set post content
    document.getElementById('viewPostTitle').textContent = post.title;
    document.getElementById('viewPostAuthor').textContent = `By ${post.author}`;
    document.getElementById('viewPostDate').textContent = post.date;
    
    // Set tags
    const tagsContainer = document.getElementById('viewPostTags');
    tagsContainer.innerHTML = '';
    post.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'blog-tag';
        tagSpan.textContent = '#' + tag;
        tagsContainer.appendChild(tagSpan);
    });
    
    // Set image with fallback
    const imageElement = document.getElementById('viewPostImage');
    if (imageElement) {
        imageElement.src = post.image;
        imageElement.alt = post.title;
        imageElement.onerror = function() {
            this.onerror = null;
            this.src = 'https://picsum.photos/800/500';
        };
    }
    
    // Set content
    document.getElementById('viewPostContent').textContent = post.content;
    
    // Load comments
    loadComments(post);
    
    // Show modal
    document.getElementById('viewPostModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Load comments for a post
function loadComments(post) {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';
    
    if (post.comments && post.comments.length > 0) {
        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
            `;
            
            commentsContainer.appendChild(commentDiv);
        });
    } else {
        commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
    }
}

// Add a comment to a post
function addComment() {
    const commentContent = document.getElementById('commentContent').value;
    if (!commentContent.trim()) {
        alert('Comment cannot be empty!');
        return;
    }
    
    const post = blogPosts.find(p => p.id === currentPostId);
    if (!post) return;
    
    // Create new comment
    const newComment = {
        author: "Current User",
        date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
        content: commentContent
    };
    
    // Add comment to post
    post.comments.push(newComment);
    
    // Save to localStorage
    saveBlogPostsToStorage();
    
    // Reload comments
    loadComments(post);
    
    // Clear comment form
    document.getElementById('commentContent').value = '';
    
    // Update blog posts display to show updated comment count
    refreshBlogPosts();
}

// Refresh blog posts display
function refreshBlogPosts() {
    const blogPostsContainer = document.querySelector('.blog-posts');
    if (!blogPostsContainer) return;
    
    // Remove any existing search header
    const existingHeader = document.querySelector('.search-results-header');
    if (existingHeader) {
        existingHeader.remove();
    }
    
    blogPostsContainer.innerHTML = '';
    
    if (blogPosts.length === 0) {
        blogPostsContainer.innerHTML = '<p>No blog posts yet. Be the first to create one!</p>';
        return;
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Add each post to the container
    sortedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        
        // Create excerpt
        const excerpt = post.content.length > 150 
            ? post.content.substring(0, 150) + '...' 
            : post.content;
        
        // Format tags as hashtags
        const tagHtml = post.tags.map(tag => `<span class="blog-tag">#${tag}</span>`).join(' ');
        
        // Use a fallback image in case the main one fails
        const fallbackImage = 'https://picsum.photos/800/500';
        
        postElement.innerHTML = `
            <div class="blog-card-img">
                <img src="${post.image}" alt="${post.title}" onerror="this.onerror=null; this.src='${fallbackImage}';">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>By ${post.author}</span>
                    <span>${post.date}</span>
                </div>
                <div class="blog-card-tags">
                    ${tagHtml}
                </div>
                <h3>${post.title}</h3>
                <p>${excerpt}</p>
                <div class="blog-card-actions">
                    <button class="blog-card-btn" onclick="openViewPostModal(${post.id})">Read More</button>
                    <button class="blog-card-btn secondary" onclick="openEditModal(${post.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="blog-card-btn delete" onclick="confirmDeletePost(${post.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="blog-card-stats">
                    <span class="like-btn" onclick="toggleLike(${post.id})">
                        <i class="far fa-heart"></i> ${post.likes}
                    </span>
                    <span>
                        <i class="far fa-comment"></i> ${post.comments.length}
                    </span>
                </div>
            </div>
        `;
        
        blogPostsContainer.appendChild(postElement);
    });
}

// Toggle like on a post
function toggleLike(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.likes += 1;
    saveBlogPostsToStorage();
    refreshBlogPosts();
}

// Open the edit post modal
function openEditModal(postId) {
    currentPostId = postId;
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.title;
        document.getElementById('editPostCategory').value = post.category || '';
        document.getElementById('editPostTags').value = post.tags.join(', ');
        document.getElementById('editPostContent').value = post.content;
        document.getElementById('currentImage').src = post.image;
        document.getElementById('currentImagePreview').style.display = 'block';
        
        editPostModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close the edit post modal
function closeEditModal() {
    editPostModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('editPostForm').reset();
    currentPostId = null;
}

// Search functionality
document.querySelector('.blog-search button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.blog-search input').value.toLowerCase();
    if (searchTerm.trim() !== '') {
        alert(`Searching for: ${searchTerm}`);
        // In a real application, you would filter posts or redirect to search results
    }
});

// Handle Enter key in search
document.querySelector('.blog-search input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.blog-search button').click();
    }
});

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up search functionality
    const searchForm = document.getElementById('blogSearchForm');
    const searchInput = document.getElementById('blogSearchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                searchBlogPosts(searchTerm);
            } else {
                // If search is empty, show all posts
                refreshBlogPosts();
            }
        });
        
        // Add real-time search as user types (optional)
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            // Only search if we have at least 3 characters
            if (searchTerm.length >= 3) {
                searchBlogPosts(searchTerm);
            } else if (searchTerm.length === 0) {
                // If search is cleared, show all posts
                refreshBlogPosts();
            }
        });
    }
});

// Function to search blog posts
function searchBlogPosts(searchTerm) {
    const blogPostsContainer = document.querySelector('.blog-posts');
    const blogPostsWrapper = document.querySelector('.blog-posts-container');
    
    if (!blogPostsContainer || !blogPostsWrapper) return;
    
    // Remove any existing search header
    const existingHeader = document.querySelector('.search-results-header');
    if (existingHeader) {
        existingHeader.remove();
    }
    
    // Create a search results header
    const searchHeader = document.createElement('div');
    searchHeader.className = 'search-results-header';
    searchHeader.innerHTML = `<h2>Search Results for "${searchTerm}"</h2>`;
    
    // Filter posts that match the search term
    const filteredPosts = blogPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    });
    
    // Clear the container
    blogPostsContainer.innerHTML = '';
    
    // Add the search header before the blog posts container
    blogPostsWrapper.insertBefore(searchHeader, blogPostsContainer);
    
    if (filteredPosts.length === 0) {
        // No results found
        const noResults = document.createElement('div');
        noResults.className = 'no-search-results';
        noResults.innerHTML = `
            <p>No posts found matching "${searchTerm}".</p>
            <button class="modal-btn modal-btn-primary" onclick="refreshBlogPosts()">Show All Posts</button>
        `;
        blogPostsContainer.appendChild(noResults);
        return;
    }
    
    // Add each matching post to the container
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        
        // Create excerpt
        const excerpt = post.content.length > 150 
            ? post.content.substring(0, 150) + '...' 
            : post.content;
        
        // Format tags as hashtags
        const tagHtml = post.tags.map(tag => `<span class="blog-tag">#${tag}</span>`).join(' ');
        
        // Highlight the search term in the title and excerpt
        const highlightedTitle = highlightText(post.title, searchTerm);
        const highlightedExcerpt = highlightText(excerpt, searchTerm);
        
        postElement.innerHTML = `
            <div class="blog-card-img">
                <img src="${post.image}" alt="${post.title}" onerror="this.onerror=null; this.src='https://picsum.photos/800/500';">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>By ${post.author}</span>
                    <span>${post.date}</span>
                </div>
                <div class="blog-card-tags">
                    ${tagHtml}
                </div>
                <h3>${highlightedTitle}</h3>
                <p>${highlightedExcerpt}</p>
                <div class="blog-card-actions">
                    <button class="blog-card-btn" onclick="openViewPostModal(${post.id})">Read More</button>
                    <button class="blog-card-btn secondary" onclick="openEditModal(${post.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="blog-card-btn delete" onclick="confirmDeletePost(${post.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="blog-card-stats">
                    <span class="like-btn" onclick="toggleLike(${post.id})">
                        <i class="far fa-heart"></i> ${post.likes}
                    </span>
                    <span>
                        <i class="far fa-comment"></i> ${post.comments.length}
                    </span>
                </div>
            </div>
        `;
        
        blogPostsContainer.appendChild(postElement);
    });
}

// Helper function to highlight search terms in text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}