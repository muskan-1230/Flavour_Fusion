document.addEventListener('DOMContentLoaded', () => {
    const recipeId = window.location.pathname.split('/').pop();
    const form = document.getElementById('editRecipeForm');

    // Load existing recipe data
    const loadRecipe = async () => {
        try {
            const response = await fetch(`/api/recipes/${recipeId}`);
            const recipe = await response.json();
            
            // Populate form fields
            document.getElementById('title').value = recipe.title;
            document.getElementById('description').value = recipe.description;
            document.getElementById('category').value = recipe.category;
            document.getElementById('dietaryType').value = recipe.dietaryType;
            document.getElementById('prepTime').value = recipe.prepTime;
            document.getElementById('ingredients').value = recipe.ingredients.join('\n');
            document.getElementById('instructions').value = recipe.instructions.join('\n');
            document.getElementById('tags').value = recipe.tags ? recipe.tags.join(', ') : '';
            document.getElementById('image').value = recipe.image || '';
        } catch (error) {
            console.error('Error loading recipe:', error);
        }
    };

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const recipeData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            dietaryType: document.getElementById('dietaryType').value,
            prepTime: parseInt(document.getElementById('prepTime').value),
            ingredients: document.getElementById('ingredients').value.split('\n').filter(i => i.trim()),
            instructions: document.getElementById('instructions').value.split('\n').filter(i => i.trim()),
            tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(Boolean),
            image: document.getElementById('image').value
        };

        try {
            const response = await fetch(`/api/recipes/${recipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipeData)
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = `/recipe/${recipeId}`;
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    });

    // Load recipe data when page loads
    loadRecipe();
});