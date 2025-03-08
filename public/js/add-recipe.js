document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const imageInput = document.getElementById('recipeImage');
    const imagePreview = document.getElementById('imagePreview');

    // Image preview functionality
    // Add this after your existing image preview code
    const fileInput = document.getElementById('recipeImage');
    const fileNameDisplay = document.querySelector('.selected-file-name');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Display file name
            fileNameDisplay.textContent = file.name;
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                fileInput.value = '';
                fileNameDisplay.textContent = '';
                imagePreview.innerHTML = '';
                return;
            }
    
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                fileInput.value = '';
                fileNameDisplay.textContent = '';
                imagePreview.innerHTML = '';
                return;
            }
    
            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Recipe preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = '';
            imagePreview.innerHTML = '';
        }
    });

    recipeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form fields
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim();
        const instructions = document.getElementById('instructions').value.trim();
        const prepTime = document.getElementById('prepTime').value.trim();
        const dietaryType = document.getElementById('dietaryType').value;

        if (!title || !description || !ingredients || !instructions || !prepTime || !dietaryType) {
            alert('Please fill in all required fields');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', JSON.stringify(ingredients.split('\n').filter(i => i.trim())));
        formData.append('instructions', JSON.stringify(instructions.split('\n').filter(i => i.trim())));
        formData.append('prepTime', prepTime);
        formData.append('dietaryType', dietaryType);

        if (imageInput.files[0]) {
            formData.append('image', imageInput.files[0]);
        }

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add recipe');
            }

            window.location.href = '/recipes';
        } catch (error) {
            console.error('Error:', error);
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.backgroundColor = '#ff4444';
            submitBtn.textContent = error.message || 'Failed to add recipe';
            setTimeout(() => {
                submitBtn.style.backgroundColor = '';
                submitBtn.textContent = 'Add Recipe';
            }, 3000);
        }
    });
});