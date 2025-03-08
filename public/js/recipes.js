document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipesContainer');

    const loadRecipes = async () => {
        try {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            
            if (data && data.recipes && data.recipes.length > 0) {
                recipesContainer.innerHTML = data.recipes.map(recipe => `
                    <div class="recipe-card">
                        <div class="recipe-image">
                            <img src="${recipe.image || '/images/default-recipe.jpg'}" alt="${recipe.title || 'Recipe Image'}">
                        </div>
                        <div class="recipe-content">
                            <h3 class="recipe-title">${recipe.title || 'Untitled Recipe'}</h3>
                            <p class="recipe-description">${recipe.description || 'No description available'}</p>
                            <div class="recipe-meta">
                                <span><i class="fas fa-clock"></i> ${recipe.prepTime || 'N/A'} mins</span>
                                <span><i class="fas fa-utensils"></i> ${recipe.dietaryType || 'N/A'}</span>
                            </div>
                            <a href="/recipe/${recipe.id}" class="view-recipe-btn">View Recipe</a>
                        </div>
                    </div>
                `).join('');
            } else {
                recipesContainer.innerHTML = '<p class="no-recipes">No recipes found. Be the first to add a recipe!</p>';
            }
        } catch (error) {
            console.error('Error loading recipes:', error);
            recipesContainer.innerHTML = '<p class="error">Error loading recipes. Please try again later.</p>';
        }
    };

    loadRecipes();
});