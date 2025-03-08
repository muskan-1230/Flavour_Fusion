document.addEventListener('DOMContentLoaded', () => {
    const recipeId = window.location.pathname.split('/').pop();
    let userRating = 0;
    
    // Comments functionality
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');

    const loadComments = async () => {
        try {
            const response = await fetch(`/api/recipes/${recipeId}/comments`);
            const comments = await response.json();
            
            if (comments && comments.length > 0) {
                commentsContainer.innerHTML = comments.map(comment => `
                    <div class="comment">
                        <div class="comment-header">
                            <span class="comment-author">${comment.author}</span>
                            <span class="comment-date">${new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                `).join('');
            } else {
                commentsContainer.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsContainer.innerHTML = '<p class="error">Error loading comments. Please try again later.</p>';
        }
    };

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
                await loadComments();
            } else {
                throw new Error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment. Please try again.');
        }
    });

    // Rating functionality
    const starRatings = document.querySelectorAll('.rating-section .star-rating .fa-star');
    starRatings.forEach(star => {
        star.addEventListener('click', async () => {
            const rating = parseInt(star.dataset.rating);
            userRating = rating;
            
            // Update UI
            starRatings.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.rating) <= rating);
            });

            try {
                const response = await fetch(`/api/recipes/${recipeId}/rate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating })
                });
                
                if (response.ok) {
                    alert('Rating submitted successfully!');
                }
            } catch (error) {
                console.error('Error submitting rating:', error);
            }
        });
    });

    // Initial load of comments
    loadComments();
});