document.addEventListener('DOMContentLoaded', () => {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    const recipeContent = document.getElementById('recipeContent');
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    const stars = document.querySelectorAll('.stars i');

    // Load recipe details
    const loadRecipe = async () => {
        // Update the loadRecipe function to include nutrition facts
        try {
            const response = await fetch(`/api/recipes/${recipeId}`);
            const recipe = await response.json();
        
            // Update nutrition values if they exist in the recipe data
            if (recipe.nutrition) {
                document.querySelector('.nutrition-grid').innerHTML = `
                    <div class="nutrition-item">
                        <span class="value">${recipe.nutrition.calories || '0'}</span>
                        <span class="label">Calories</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="value">${recipe.nutrition.protein || '0g'}</span>
                        <span class="label">Protein</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="value">${recipe.nutrition.carbs || '0g'}</span>
                        <span class="label">Carbs</span>
                    </div>
                    <div class="nutrition-item">
                        <span class="value">${recipe.nutrition.fat || '0g'}</span>
                        <span class="label">Fat</span>
                    </div>
                `;
            }
            displayRecipe(recipe);
        } catch (error) {
            console.error('Error loading recipe:', error);
        }
    };

    // Display recipe details
    const displayRecipe = (recipe) => {
        recipeContent.innerHTML = `
            <div class="recipe-header">
                <h1>${recipe.title}</h1>
                <p>By ${recipe.author} | ${new Date(recipe.createdAt).toLocaleDateString()}</p>
            </div>
            <img src="${recipe.image || '/images/default-recipe.jpg'}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <div>
                    <strong>Preparation Time:</strong> ${recipe.prepTime} minutes
                </div>
                <div>
                    <strong>Dietary Type:</strong> ${recipe.dietaryType}
                </div>
            </div>
            <div class="ingredients-list">
                <h2>Ingredients</h2>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            <div class="instructions-list">
                <h2>Instructions</h2>
                <ol>
                    ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        `;
    };

    // Handle star rating
    stars.forEach(star => {
        star.addEventListener('click', async () => {
            const rating = star.dataset.rating;
            try {
                const response = await fetch(`/api/recipes/${recipeId}/rate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating })
                });
                if (response.ok) {
                    updateStars(rating);
                }
            } catch (error) {
                console.error('Error rating recipe:', error);
            }
        });
    });

    // Update star display
    const updateStars = (rating) => {
        stars.forEach(star => {
            const starRating = star.dataset.rating;
            star.className = starRating <= rating ? 'fas fa-star' : 'far fa-star';
        });
    };

    // Consolidate the comment handling code
    document.addEventListener('DOMContentLoaded', () => {
        const recipeId = window.location.pathname.split('/').pop();
        const commentForm = document.getElementById('commentForm');
        const commentsContainer = document.getElementById('commentsContainer');
    
        // Handle comment submission
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const commentText = document.getElementById('commentText').value;
    
            if (!commentText.trim()) return;
    
            try {
                const response = await fetch(`/api/recipes/${recipeId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: commentText })
                });
    
                if (response.ok) {
                    document.getElementById('commentText').value = '';
                    await loadComments(); // Refresh comments after posting
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        });
    
        // Load and display comments
        const loadComments = async () => {
            try {
                const response = await fetch(`/api/recipes/${recipeId}/comments`);
                const comments = await response.json();
                
                if (comments.length === 0) {
                    commentsContainer.innerHTML = '<p class="no-comments">Be the first to comment!</p>';
                    return;
                }
    
                commentsContainer.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <div class="comment-header">
                            <strong>${comment.author}</strong>
                            <span>${new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>${comment.text}</p>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Error loading comments:', error);
                commentsContainer.innerHTML = '<p class="error">Failed to load comments</p>';
            }
        };
    
        // Initial load of comments
        loadComments();
    });

    const displayComments = (comments) => {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <strong>${comment.author}</strong>
                    <span>${new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>${comment.text}</p>
            </div>
        `).join('');
    };

    // Initial load
    loadRecipe();
    loadComments();
});

// Add these functions to your existing recipe-detail.js

function shareRecipe(platform) {
    const recipeUrl = window.location.href;
    const recipeTitle = document.querySelector('.recipe-header h1').textContent;
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}&text=${encodeURIComponent(`Check out this recipe: ${recipeTitle}`)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${recipeTitle} - ${recipeUrl}`)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
}

function copyLink() {
    const recipeUrl = window.location.href;
    navigator.clipboard.writeText(recipeUrl).then(() => {
        showShareSuccess('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link:', err);
    });
}

function showShareSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'share-success';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add QR Code generation for recipe sharing
function generateQRCode() {
    const recipeUrl = window.location.href;
    const qrContainer = document.getElementById('qrcode');
    
    if (qrContainer) {
        new QRCode(qrContainer, {
            text: recipeUrl,
            width: 128,
            height: 128
        });
    }
}

// Add to your existing recipe-detail.js
document.addEventListener('DOMContentLoaded', async () => {
    const recipeId = window.location.pathname.split('/').pop();
    const recipeContent = document.getElementById('recipeContent');

    // In the loadRecipe function
    try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const recipe = await response.json();
    
        // Update the title
        document.getElementById('recipeTitle').textContent = recipe.title;
    
        recipeContent.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            
            <div class="recipe-meta">
                <span><i class="fas fa-clock"></i> ${recipe.prepTime} mins</span>
                <span><i class="fas fa-utensils"></i> ${recipe.dietaryType}</span>
                <span><i class="fas fa-user"></i> ${recipe.author}</span>
                <span><i class="fas fa-calendar"></i> ${new Date(recipe.createdAt).toLocaleDateString()}</span>
            </div>
    
            <div class="recipe-section">
                <p class="recipe-description">${recipe.description}</p>
            </div>

            <div class="recipe-section">
                <h2 class="section-title">Ingredients</h2>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `
                        <li>${ingredient}</li>
                    `).join('')}
                </ul>
            </div>

            <div class="recipe-section">
                <h2 class="section-title">Instructions</h2>
                <ol class="instructions-list">
                    ${recipe.instructions.map(instruction => `
                        <li>${instruction}</li>
                    `).join('')}
                </ol>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        recipeContent.innerHTML = '<p class="error">Failed to load recipe details</p>';
    }
});

// Add to your existing recipe-detail.js
document.addEventListener('DOMContentLoaded', async () => {
    const recipeId = window.location.pathname.split('/').pop();
    const favoriteBtn = document.getElementById('favoriteBtn');
    let isFavorited = false;

    // Check if recipe is favorited
    const checkFavoriteStatus = async () => {
        try {
            const response = await fetch(`/api/favorites/check/${recipeId}`);
            const data = await response.json();
            isFavorited = data.isFavorited;
            updateFavoriteButton();
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    // Toggle favorite status
    const toggleFavorite = async () => {
        try {
            const method = isFavorited ? 'DELETE' : 'POST';
            const response = await fetch(`/api/favorites/${recipeId}`, { 
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            if (data.success) {
                isFavorited = !isFavorited;
                updateFavoriteButton();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    // Update button appearance
    const updateFavoriteButton = () => {
        favoriteBtn.classList.toggle('active', isFavorited);
        favoriteBtn.querySelector('i').className = isFavorited ? 'fas fa-heart' : 'far fa-heart';
        favoriteBtn.querySelector('span').textContent = isFavorited ? 'Remove from Favorites' : 'Add to Favorites';
    };

    // Add click event listener
    favoriteBtn.addEventListener('click', toggleFavorite);

    // Check initial favorite status
    checkFavoriteStatus();
});

document.addEventListener('DOMContentLoaded', () => {
    const recipeId = window.location.pathname.split('/').pop();
    const recipeContent = document.getElementById('recipeContent');
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const stars = document.querySelectorAll('.stars i');
    let currentRating = 0;
    let totalRatings = 0;
    let isFavorited = false;

    // Main initialization
    const init = async () => {
        await loadRecipe();
        await loadComments();
        await checkFavoriteStatus();
        setupEventListeners();
        generateQRCode();
    };

    // Function to update star display
    function updateStarDisplay(rating) {
        stars.forEach(s => {
            const starRating = parseInt(s.dataset.rating);
            if (starRating <= rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    }

    // Update this function to handle both rating and total count
    function updateRatingText(rating, total = totalRatings) {
        document.getElementById('averageRating').textContent = rating;
        document.getElementById('totalRatings').textContent = total;
    }

    // Handle click with updated response handling
    stars.forEach(star => {
        star.addEventListener('click', async () => {
            const rating = parseInt(star.dataset.rating);
            try {
                const response = await fetch(`/api/recipes/${recipeId}/rate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating })
                });

                if (response.ok) {
                    const data = await response.json();
                    currentRating = rating;
                    totalRatings = data.totalRatings || totalRatings + 1;
                    updateStarDisplay(rating);
                    updateRatingText(rating, totalRatings);
                }
            } catch (error) {
                console.error('Error submitting rating:', error);
            }
        });

        // Update hover handlers to include total ratings
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateStarDisplay(rating);
            updateRatingText(rating, totalRatings);
        });
    });

    // Update mouse leave handler
    document.querySelector('.stars').addEventListener('mouseleave', () => {
        updateStarDisplay(currentRating);
        updateRatingText(currentRating, totalRatings);
    });
});

function printRecipe() {
    const recipe = document.getElementById('recipeContent');
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Recipe</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    img { max-width: 500px; height: auto; }
                    .recipe-meta { margin: 20px 0; }
                    .ingredients-list, .instructions-list { margin: 20px 0; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${recipe.innerHTML}
                <script>
                    window.onload = function() { window.print(); window.close(); }
                </script>
            </body>
        </html>
    `);
    
    printWindow.document.close();
}