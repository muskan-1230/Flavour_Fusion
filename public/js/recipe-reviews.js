document.addEventListener('DOMContentLoaded', () => {
    const recipeId = window.location.pathname.split('/').pop();
    
    const initializeReviews = async () => {
        await loadReviews();
        setupRatingSystem();
        setupReviewForm();
    };

    const loadReviews = async () => {
        try {
            const response = await fetch(`/api/recipes/${recipeId}/reviews`);
            const reviews = await response.json();
            displayReviews(reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    };

    const displayReviews = (reviews) => {
        const reviewsContainer = document.getElementById('reviewsContainer');
        reviewsContainer.innerHTML = reviews.length ? reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="user-info">
                        <i class="fas fa-user-circle"></i>
                        <span>${review.username}</span>
                    </div>
                    <div class="rating">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.comment}</p>
                <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
            </div>
        `).join('') : '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
    };

    const generateStars = (rating) => {
        return Array(5).fill(0).map((_, index) => 
            `<i class="fas fa-star ${index < rating ? 'filled' : ''}"></i>`
        ).join('');
    };

    const setupRatingSystem = () => {
        const ratingStars = document.querySelectorAll('.rating-input i');
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => {
                document.getElementById('ratingValue').value = index + 1;
                ratingStars.forEach((s, i) => {
                    s.classList.toggle('filled', i <= index);
                });
            });
        });
    };

    const setupReviewForm = () => {
        const reviewForm = document.getElementById('reviewForm');
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const rating = document.getElementById('ratingValue').value;
            const comment = document.getElementById('reviewComment').value;

            try {
                const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating, comment })
                });

                if (response.ok) {
                    await loadReviews();
                    reviewForm.reset();
                    document.querySelectorAll('.rating-input i').forEach(star => {
                        star.classList.remove('filled');
                    });
                }
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        });
    };

    initializeReviews();
});