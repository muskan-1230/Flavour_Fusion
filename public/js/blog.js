// Blog post data (in a real application, this would come from a database)
const blogPosts = [
    {
        id: 1,
        title: "10 Essential Knife Skills Every Home Cook Should Master",
        author: "Chef Maria",
        date: "June 15, 2023",
        category: "cooking-tips",
        tags: ["Cooking Tips", "Techniques"],
        image: "https://source.unsplash.com/random/600x400?cooking",
        content: `<p>Having proper knife skills is one of the most fundamental aspects of cooking. Not only does it make your food look better, but it also ensures even cooking and can significantly speed up your meal preparation.</p>
        
        <h3>1. The Proper Grip</h3>
        <p>Before you start cutting, it's essential to hold your knife correctly. Pinch the blade between your thumb and forefinger at the point where the blade meets the handle, then wrap your remaining fingers around the handle. This grip gives you the most control over the knife.</p>
        
        <h3>2. The Claw Technique</h3>
        <p>To keep your fingers safe, use the "claw" technique when holding the food you're cutting. Curl your fingertips under and use your knuckles as a guide for the knife. This way, even if the knife slips, it will hit your knuckles rather than your fingertips.</p>
        
        <h3>3. Dicing an Onion</h3>
        <p>Dicing an onion efficiently is a skill that will save you time and tears. Start by cutting the onion in half through the root end. Peel off the skin, then make horizontal cuts parallel to the cutting board, followed by vertical cuts from top to bottom. Finally, slice across these cuts to create perfect dice.</p>
        
        <h3>4. Julienne Cuts</h3>
        <p>Julienne cuts create thin, matchstick-sized pieces that cook quickly and look elegant. To julienne a vegetable, first cut it into thin slices, then stack those slices and cut them into thin strips.</p>
        
        <h3>5. Chiffonade</h3>
        <p>Chiffonade is a technique used for leafy herbs and vegetables. Stack the leaves, roll them tightly, then slice thinly to create delicate ribbons. This is perfect for basil, mint, or spinach.</p>
        
        <h3>6. Mincing Garlic</h3>
        <p>To mince garlic efficiently, first crush the clove with the flat side of your knife to remove the skin. Then, finely chop the garlic. For an even finer mince, sprinkle a little salt on the chopped garlic and use the side of your knife to crush and drag it across the cutting board.</p>
        
        <h3>7. Butterflying</h3>
        <p>Butterflying is a technique used to create a uniform thickness in meat or poultry. Make a horizontal cut through the center of the meat, stopping just before cutting all the way through, then open it like a book. This is particularly useful for chicken breasts or pork tenderloin.</p>
        
        <h3>8. Carving</h3>
        <p>Properly carving a roast or poultry ensures that each slice is tender and visually appealing. Always carve against the grain of the meat, using long, smooth strokes with a sharp knife.</p>
        
        <h3>9. Supreming Citrus</h3>
        <p>Supreming is a technique for removing the segments of citrus fruits without any pith or membrane. Cut off the top and bottom of the fruit, then remove the peel and pith by following the curve of the fruit. Finally, cut between the membranes to release the segments.</p>
        
        <h3>10. Keeping Your Knives Sharp</h3>
        <p>A sharp knife is safer and more efficient than a dull one. Learn to use a honing steel to maintain your knife's edge between sharpenings, and invest in a good quality knife sharpener or have your knives professionally sharpened regularly.</p>
        
        <p>Mastering these knife skills will not only make you more efficient in the kitchen but will also elevate the presentation and quality of your dishes. Practice regularly, and soon these techniques will become second nature.</p>`,
        likes: 42,
        comments: [
            {
                author: "John Smith",
                date: "June 16, 2023",
                content: "This article was incredibly helpful! I've always struggled with dicing onions efficiently, but the technique described here made a huge difference."
            },
            {
                author: "Lisa Johnson",
                date: "June 17, 2023",
                content: "I never knew about the claw technique before. It's already saved me from a few close calls in the kitchen. Thanks for sharing these tips!"
            }
        ]
    },
    {
        id: 2,
        title: "The Art of Spice Blending: Create Your Own Signature Mixes",
        author: "Spice Expert Alex",
        date: "June 10, 2023",
        category: "ingredients",
        tags: ["Ingredients", "Spices"],
        image: "https://source.unsplash.com/random/600x400?spices",
        content: `<p>Spice blends are the secret weapon of many great cooks. By creating your own signature spice mixes, you can instantly add complex, balanced flavors to any dish with just a sprinkle.</p>
        
        <h3>Understanding Flavor Profiles</h3>
        <p>Before you start blending spices, it's important to understand the basic flavor categories: sweet, salty, sour, bitter, and umami. A well-balanced spice blend often incorporates several of these elements.</p>
        
        <h3>Essential Spices for Your Pantry</h3>
        <p>Start with these foundational spices: black peppercorns, cumin seeds, coriander seeds, cinnamon sticks, cardamom pods, cloves, mustard seeds, paprika, turmeric, and dried chilies. Having both whole and ground versions gives you maximum flexibility.</p>
        
        <h3>Tools of the Trade</h3>
        <p>Invest in a good spice grinder or mortar and pestle. Freshly ground spices have significantly more flavor than pre-ground ones. A set of airtight containers is also essential for storing your creations.</p>
        
        <h3>The Art of Toasting</h3>
        <p>Toasting whole spices before grinding them awakens their essential oils and deepens their flavor. Use a dry skillet over medium heat, shaking frequently, until the spices become fragrant—usually just 1-2 minutes.</p>
        
        <h3>Classic Spice Blend Recipes to Master</h3>
        <p>Start by learning these fundamental blends:</p>
        <ul>
            <li><strong>Garam Masala:</strong> A warming Indian blend featuring cinnamon, cardamom, cloves, cumin, and coriander</li>
            <li><strong>Za'atar:</strong> A Middle Eastern mix of dried thyme, sumac, sesame seeds, and salt</li>
            <li><strong>Five-Spice Powder:</strong> A Chinese blend of star anise, cloves, cinnamon, Sichuan peppercorns, and fennel seeds</li>
            <li><strong>Herbes de Provence:</strong> A French herb mixture including thyme, basil, rosemary, tarragon, and lavender</li>
        </ul>
        
        <h3>Creating Your Signature Blend</h3>
        <p>Once you understand the classics, start experimenting. Begin with a dominant flavor, then add complementary spices in smaller amounts. Keep notes on your recipes so you can replicate successful blends.</p>
        
        <h3>Balancing Act</h3>
        <p>Remember that some spices are more potent than others. Start with small amounts of strong spices like cloves, star anise, and cayenne, then adjust to taste.</p>
        
        <h3>Storage and Shelf Life</h3>
        <p>Store your spice blends in airtight containers away from heat, light, and moisture. Most blends will stay fresh for about 3-6 months before losing potency.</p>
        
        <h3>Pairing Spice Blends with Foods</h3>
        <p>Different blends work better with certain ingredients. Warm, sweet spices like cinnamon and nutmeg pair well with root vegetables and fruits. Earthy spices like cumin and coriander complement legumes and meats.</p>
        
        <p>Creating your own spice blends is a journey of discovery that will transform your cooking. Start with small batches, taste frequently, and don't be afraid to adjust and experiment until you find combinations that delight your palate.</p>`,
        likes: 38,
        comments: [
            {
                author: "Maria Garcia",
                date: "June 11, 2023",
                content: "I made the garam masala blend following your proportions and it was so much better than store-bought! Can't wait to try making za'atar next."
            }
        ]
    }
    // Additional blog posts would be added here
];

// DOM Elements
const newPostModal = document.getElementById('newPostModal');
const editPostModal = document.getElementById('editPostModal');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const viewPostModal = document.getElementById('viewPostModal');
let currentPostId = null;

// Open the new post modal
function openNewPostModal() {
    newPostModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close the new post modal
function closeNewPostModal() {
    newPostModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    document.getElementById('newPostForm').reset();
}

// Open the edit post modal
function openEditModal(postId) {
    currentPostId = postId;
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
        document.getElementById('editPostId').value = post.id;
        document.getElementById('editPostTitle').value = post.title;
        document.getElementById('editPostCategory').value = post.category;
        document.getElementById('editPostTags').value = post.tags.join(', ');
        document.getElementById('editPostContent').value = post.content;
        document.getElementById('currentImage').src = post.image;
        document.getElementById('currentImagePreview').style.display = 'block';
        
        editPostModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close the edit post modal
function closeEditModal() {
    editPostModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('editPostForm').reset();
    currentPostId = null;
}

// Open delete confirmation modal
function confirmDeletePost() {
    closeEditModal();
    deleteConfirmModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close delete confirmation modal
function closeDeleteConfirmModal() {
    deleteConfirmModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Delete post
function deletePost() {
    // In a real application, you would send a request to your server to delete the post
    alert(`Post with ID ${currentPostId} would be deleted`);
    closeDeleteConfirmModal();
    // After successful deletion, you would typically refresh the page or update the UI
}

// Open view post modal
function openViewPostModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
        document.getElementById('viewPostTitle').textContent = post.title;
        document.getElementById('viewPostAuthor').textContent = `By ${post.author}`;
        document.getElementById('viewPostDate').textContent = post.date;
        
        // Clear and populate tags
        const tagsContainer = document.getElementById('viewPostTags');
        tagsContainer.innerHTML = '';
        post.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'blog-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
        
        // Set image
        const imageElement = document.querySelector('#viewPostImage img');
        imageElement.src = post.image;
        
        // Set content
        document.getElementById('viewPostContent').innerHTML = post.content;
        
        // Clear and populate comments
        const commentsContainer = document.getElementById('commentsContainer');
        commentsContainer.innerHTML = '';
        
        if (post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.style.padding = '1rem 0';
                commentDiv.style.borderBottom = '1px solid var(--border-color-light)';
                
                const commentHeader = document.createElement('div');
                commentHeader.style.display = 'flex';
                commentHeader.style.justifyContent = 'space-between';
                commentHeader.style.marginBottom = '0.5rem';
                
                const authorSpan = document.createElement('span');
                authorSpan.style.fontWeight = 'bold';
                authorSpan.textContent = comment.author;
                
                const dateSpan = document.createElement('span');
                dateSpan.style.color = 'var(--text-secondary)';
                dateSpan.style.fontSize = '0.9rem';
                dateSpan.textContent = comment.date;
                
                commentHeader.appendChild(authorSpan);
                commentHeader.appendChild(dateSpan);
                
                const commentContent = document.createElement('p');
                commentContent.textContent = comment.content;
                
                commentDiv.appendChild(commentHeader);
                commentDiv.appendChild(commentContent);
                commentsContainer.appendChild(commentDiv);
            });
        } else {
            commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        }
        
        viewPostModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close view post modal
function closeViewPostModal() {
    viewPostModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modals when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === newPostModal) {
            closeNewPostModal();
        } else if (event.target === editPostModal) {
            closeEditModal();
        } else if (event.target === deleteConfirmModal) {
            closeDeleteConfirmModal();
        } else if (event.target === viewPostModal) {
            closeViewPostModal();
        }
    });
    
    // Form submissions
    document.getElementById('newPostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send the form data to your server
        alert('New post would be created');
        closeNewPostModal();
    });
    
    document.getElementById('editPostForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send the form data to your server
        alert(`Post with ID ${currentPostId} would be updated`);
        closeEditModal();
    });
    
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const commentContent = document.getElementById('commentContent').value;
        if (commentContent.trim() !== '') {
            alert('Comment would be added');
            document.getElementById('commentContent').value = '';
        }
    });
    
    // Add click event listeners to "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.blog-card-btn:not(.secondary)');
    readMoreButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            openViewPostModal(index + 1); // Assuming IDs start from 1
        });
    });
    
    // Like functionality
    const likeElements = document.querySelectorAll('.blog-card-stats span:first-child');
    likeElements.forEach(element => {
        element.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                const count = parseInt(this.textContent.match(/\d+/)[0]) + 1;
                this.innerHTML = `<i class="fas fa-heart"></i> ${count}`;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                const count = parseInt(this.textContent.match(/\d+/)[0]) - 1;
                this.innerHTML = `<i class="far fa-heart"></i> ${count}`;
            }
        });
    });
});

// Search functionality
document.querySelector('.blog-search button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.blog-search input').value.toLowerCase();
    if (searchTerm.trim() !== '') {
        alert(`Searching for: ${searchTerm}`);
        // In a real application, you would filter posts or redirect to search results
    }
});

// Handle Enter key in search
document.querySelector('.blog-search input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.blog-search button').click();
    }
});