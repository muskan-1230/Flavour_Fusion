document.addEventListener('DOMContentLoaded', () => {
    const recipeOfDayContainer = document.getElementById('recipeOfDay');

    const loadRecipeOfDay = async () => {
        try {
            const response = await fetch('/api/recipe-of-day');
            const recipe = await response.json();
            displayRecipeOfDay(recipe);
        } catch (error) {
            console.error('Error loading recipe of the day:', error);
        }
    };

    const displayRecipeOfDay = (recipe) => {
        recipeOfDayContainer.innerHTML = `
            <img src="${recipe.image || '/images/default-recipe.jpg'}" 
                 alt="${recipe.title}" 
                 class="featured-recipe-image">
            <div class="featured-recipe-content">
                <h3 class="featured-recipe-title">${recipe.title}</h3>
                <p class="featured-recipe-description">${recipe.description}</p>
                <div class="featured-recipe-meta">
                    <span><i class="far fa-clock"></i> ${recipe.prepTime} mins</span>
                    <span><i class="fas fa-utensils"></i> ${recipe.dietaryType}</span>
                    <span><i class="fas fa-user"></i> By ${recipe.author}</span>
                </div>
                <a href="/recipe/${recipe.id}" class="view-recipe-btn">View Recipe</a>
            </div>
        `;
    };

    // Add this new function to load favorites
    const loadFavorites = async () => {
        try {
            const response = await fetch('/api/favorites');
            const favorites = await response.json();
            displayFavorites(favorites);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const displayFavorites = (favorites) => {
        const favoritesGrid = document.getElementById('favoritesGrid');
        if (favorites.length === 0) {
            favoritesGrid.innerHTML = '<p>No favorite recipes yet. Start exploring and add some!</p>';
            return;
        }

        favoritesGrid.innerHTML = favorites.map(recipe => `
            <a href="/recipe/${recipe.id}" class="recipe-card">
                <img src="${recipe.image || '/images/default-recipe.jpg'}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-info">
                        <p>By ${recipe.author}</p>
                        <p>Added to favorites: ${new Date(recipe.favoritedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </a>
        `).join('');
    };

    // Call loadFavorites when page loads
    loadFavorites();
    loadRecipeOfDay();
});