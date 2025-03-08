document.addEventListener('DOMContentLoaded', () => {
    const loadUserProfile = async () => {
        try {
            const response = await fetch('/api/user/profile');
            const user = await response.json();
            displayUserInfo(user);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    const loadUserStats = async () => {
        try {
            const response = await fetch('/api/user/stats');
            const stats = await response.json();
            displayStats(stats);
        } catch (error) {
            console.error('Error loading user stats:', error);
        }
    };

    const displayUserInfo = (user) => {
        document.getElementById('username').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;
    };

    const displayStats = (stats) => {
        document.getElementById('recipeCount').textContent = stats.recipeCount;
        document.getElementById('favoriteCount').textContent = stats.favoriteCount;
        document.getElementById('avgRating').textContent = stats.averageRating.toFixed(1);
    };

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabContents = document.querySelectorAll('.recipe-grid');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');

            if (tab.dataset.tab === 'my-recipes') {
                loadUserRecipes();
            } else {
                loadFavoriteRecipes();
            }
        });
    });

    const loadUserRecipes = async () => {
        try {
            const response = await fetch('/api/user/recipes');
            const recipes = await response.json();
            displayRecipes('my-recipes', recipes);
        } catch (error) {
            console.error('Error loading user recipes:', error);
        }
    };

    const loadFavoriteRecipes = async () => {
        try {
            const response = await fetch('/api/favorites');
            const recipes = await response.json();
            displayRecipes('favorites', recipes);
        } catch (error) {
            console.error('Error loading favorite recipes:', error);
        }
    };

    // Update the displayRecipes function to include edit buttons for user's recipes
    const displayRecipes = (containerId, recipes) => {
        const container = document.getElementById(containerId);
        if (recipes.length === 0) {
            container.innerHTML = `<p class="no-recipes">No recipes to display</p>`;
            return;
        }
    
        container.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <a href="/recipe/${recipe.id}" class="recipe-link">
                    <img src="${recipe.image || '/images/default-recipe.jpg'}" alt="${recipe.title}" class="recipe-image">
                    <div class="recipe-content">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <div class="recipe-info">
                            <p><i class="far fa-clock"></i> ${recipe.prepTime} mins</p>
                            <p><i class="fas fa-utensils"></i> ${recipe.category}</p>
                        </div>
                    </div>
                </a>
                ${containerId === 'my-recipes' ? 
                    `<a href="/recipe/${recipe.id}/edit" class="edit-btn">
                        <i class="fas fa-edit"></i> Edit Recipe
                    </a>` : ''
                }
            </div>
        `).join('');
    };

    // Initial load
    loadUserProfile();
    loadUserStats();
    loadUserRecipes(); // Load My Recipes tab by default
});