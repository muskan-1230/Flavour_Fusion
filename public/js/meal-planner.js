document.addEventListener('DOMContentLoaded', () => {
    let currentWeek = new Date();
    let selectedSlot = null;
    let mealPlan = {};

    // Initialize the meal planner
    const initializePlanner = () => {
        updateWeekDisplay();
        createMealGrid();
        loadRecipes();
        loadMealPlan();
    };

    // Update week display
    const updateWeekDisplay = () => {
        const startOfWeek = getStartOfWeek(currentWeek);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        
        document.getElementById('weekDisplay').textContent = 
            `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    };

    // Create the meal grid
    const createMealGrid = () => {
        const grid = document.querySelector('.meal-grid');
        grid.innerHTML = '';
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const meals = ['Breakfast', 'Lunch', 'Dinner'];
        
        days.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            
            dayCard.innerHTML = `
                <div class="day-header">${day}</div>
                ${meals.map(meal => `
                    <div class="meal-slot" data-day="${day}" data-meal="${meal}">
                        <h4>${meal}</h4>
                        <div class="meal-content"></div>
                    </div>
                `).join('')}
            `;
            
            grid.appendChild(dayCard);
        });

        // Add click listeners to meal slots
        document.querySelectorAll('.meal-slot').forEach(slot => {
            slot.addEventListener('click', () => selectMealSlot(slot));
        });
    };

    // Load recipes for selection
    const loadRecipes = async () => {
        try {
            const response = await fetch('/api/recipes');
            const data = await response.json();
            displayRecipes(data.recipes);
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    };

    // Display recipes in the selector
    const displayRecipes = (recipes) => {
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = recipes.map(recipe => `
            <div class="recipe-item" data-recipe-id="${recipe.id}">
                <h4>${recipe.title}</h4>
                <p>${recipe.prepTime} mins | ${recipe.category}</p>
            </div>
        `).join('');

        // Add click listeners to recipes
        document.querySelectorAll('.recipe-item').forEach(item => {
            item.addEventListener('click', () => selectRecipe(item.dataset.recipeId));
        });
    };

    // Select a meal slot
    const selectMealSlot = (slot) => {
        if (selectedSlot) {
            selectedSlot.classList.remove('selected');
        }
        selectedSlot = slot;
        slot.classList.add('selected');
        document.getElementById('recipeSelector').style.display = 'block';
    };

    // Select a recipe for the slot
    const selectRecipe = async (recipeId) => {
        if (!selectedSlot) return;

        try {
            const response = await fetch(`/api/recipes/${recipeId}`);
            const recipe = await response.json();
            
            const day = selectedSlot.dataset.day;
            const meal = selectedSlot.dataset.meal;
            
            // Update the meal plan
            if (!mealPlan[day]) mealPlan[day] = {};
            mealPlan[day][meal] = recipe;
            
            // Update the UI
            selectedSlot.querySelector('.meal-content').innerHTML = `
                <div class="planned-meal">
                    <h5>${recipe.title}</h5>
                    <button class="remove-meal" onclick="removeMeal('${day}', '${meal}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            selectedSlot.classList.add('filled');
            saveMealPlan();
            updateShoppingList();
        } catch (error) {
            console.error('Error loading recipe:', error);
        }
    };

    // Remove a meal from the plan
    window.removeMeal = (day, meal) => {
        if (mealPlan[day]) {
            delete mealPlan[day][meal];
            if (Object.keys(mealPlan[day]).length === 0) {
                delete mealPlan[day];
            }
        }
        
        const slot = document.querySelector(`.meal-slot[data-day="${day}"][data-meal="${meal}"]`);
        slot.querySelector('.meal-content').innerHTML = '';
        slot.classList.remove('filled');
        
        saveMealPlan();
        updateShoppingList();
    };

    // Save meal plan
    const saveMealPlan = async () => {
        try {
            await fetch('/api/meal-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    week: currentWeek.toISOString(),
                    plan: mealPlan
                })
            });
        } catch (error) {
            console.error('Error saving meal plan:', error);
        }
    };

    // Load meal plan
    const loadMealPlan = async () => {
        try {
            const response = await fetch(`/api/meal-plan?week=${currentWeek.toISOString()}`);
            const data = await response.json();
            mealPlan = data.plan || {};
            updateMealPlanUI();
        } catch (error) {
            console.error('Error loading meal plan:', error);
        }
    };

    // Update shopping list
    const updateShoppingList = () => {
        const ingredients = new Map();
        
        // Collect all ingredients
        Object.values(mealPlan).forEach(dayMeals => {
            Object.values(dayMeals).forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    if (ingredients.has(ingredient)) {
                        ingredients.set(ingredient, ingredients.get(ingredient) + 1);
                    } else {
                        ingredients.set(ingredient, 1);
                    }
                });
            });
        });

        // Update UI
        const shoppingList = document.getElementById('shoppingList');
        shoppingList.innerHTML = Array.from(ingredients.entries())
            .map(([ingredient, count]) => `
                <div class="ingredient-item">
                    <input type="checkbox">
                    <span>${ingredient} ${count > 1 ? `(${count}x)` : ''}</span>
                </div>
            `).join('');
    };

    // Week navigation
    document.getElementById('prevWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() - 7);
        updateWeekDisplay();
        loadMealPlan();
    });

    document.getElementById('nextWeek').addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() + 7);
        updateWeekDisplay();
        loadMealPlan();
    });

    // Recipe search
    document.getElementById('recipeSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.recipe-item').forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            item.style.display = title.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Download shopping list
    document.getElementById('downloadList').addEventListener('click', () => {
        const list = Array.from(document.querySelectorAll('.ingredient-item'))
            .map(item => item.querySelector('span').textContent)
            .join('\n');
        
        const blob = new Blob([list], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shopping-list.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Helper function to get start of week
    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d;
    };

    // Initialize the planner
    initializePlanner();
});