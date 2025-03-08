document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');

    blogForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            content: document.getElementById('content').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
            // Image handling would require additional setup for file upload
        };

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.href = '/blog';
            } else {
                alert('Error creating blog post');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the blog post');
        }
    });
});