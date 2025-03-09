// Global JavaScript for functionality that should be available on all pages

// About modal functions
function openAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeAboutModal() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('aboutModal');
    if (event.target === modal) {
        closeAboutModal();
    }
});

// Initialize global elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if footer exists and add About modal if it doesn't exist yet
    const footer = document.querySelector('footer');
    if (footer && !document.getElementById('aboutModal')) {
        // Create About modal element
        const aboutModal = document.createElement('div');
        aboutModal.id = 'aboutModal';
        aboutModal.className = 'modal';
        
        // Set modal HTML content
        aboutModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>About FlavorFusion</h2>
                    <span class="modal-close" onclick="closeAboutModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="about-section">
                        <img src="/img/logo.png" alt="FlavorFusion Logo" class="about-logo">
                        <h3>Our Mission</h3>
                        <p>At FlavorFusion, we're passionate about bringing culinary creativity to your kitchen. Our mission is to inspire home cooks of all skill levels to explore new flavors, techniques, and cuisines.</p>
                        
                        <h3>Who We Are</h3>
                        <p>Founded in 2023, FlavorFusion is a community-driven platform created by food enthusiasts for food enthusiasts. Our team of chefs, nutritionists, and tech experts work together to provide you with the best culinary resources.</p>
                        
                        <h3>What We Offer</h3>
                        <ul>
                            <li><strong>Recipe Discovery:</strong> Explore thousands of recipes from around the world</li>
                            <li><strong>Meal Planning:</strong> Organize your weekly meals with our intuitive planner</li>
                            <li><strong>Shopping Lists:</strong> Generate shopping lists from your selected recipes</li>
                            <li><strong>Cooking Blog:</strong> Learn tips, tricks, and food stories from our community</li>
                            <li><strong>Personalized Experience:</strong> Save favorites and get recommendations based on your preferences</li>
                        </ul>
                        
                        <h3>Our Values</h3>
                        <p>We believe that good food brings people together. We're committed to:</p>
                        <ul>
                            <li>Promoting culinary diversity and cultural appreciation</li>
                            <li>Supporting sustainable cooking practices</li>
                            <li>Making cooking accessible to everyone</li>
                            <li>Building a positive and supportive community</li>
                        </ul>
                        
                        <h3>Join Our Community</h3>
                        <p>Whether you're a beginner cook or a seasoned chef, FlavorFusion welcomes you to join our growing community. Share your recipes, learn from others, and embark on a flavorful journey with us!</p>
                    </div>
                </div>
            </div>
        `;
        
        // Append modal to body
        document.body.appendChild(aboutModal);
        
        // Update all "About Us" links in the footer
        const aboutLinks = footer.querySelectorAll('a[href="/about"]');
        aboutLinks.forEach(link => {
            link.setAttribute('href', '#');
            link.setAttribute('onclick', 'openAboutModal(); return false;');
        });
    }
}); 