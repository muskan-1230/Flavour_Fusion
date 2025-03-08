document.addEventListener('DOMContentLoaded', () => {
    // Reading Progress Bar
    const progressBar = document.querySelector('.reading-progress-bar');
    const content = document.querySelector('.post-content');
    
    const updateReadingProgress = () => {
        if (!content || !progressBar) return;
        
        const contentBox = content.getBoundingClientRect();
        const contentHeight = contentBox.height;
        const scrollPosition = window.scrollY - contentBox.top;
        const progress = (scrollPosition / contentHeight) * 100;
        
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    window.addEventListener('scroll', updateReadingProgress);
    window.addEventListener('resize', updateReadingProgress);

    // Table of Contents Generation
    const generateTableOfContents = () => {
        const headings = content.querySelectorAll('h2, h3, h4');
        const tocList = document.querySelector('.toc-list');
        
        if (!tocList || headings.length === 0) return;

        headings.forEach((heading, index) => {
            // Generate unique ID for the heading
            const headingId = `heading-${index}`;
            heading.id = headingId;

            // Create TOC item
            const listItem = document.createElement('li');
            listItem.className = 'toc-item';
            
            const link = document.createElement('a');
            link.href = `#${headingId}`;
            link.className = 'toc-link';
            link.textContent = heading.textContent;
            
            // Add indent for h3 and h4
            if (heading.tagName === 'H3') {
                listItem.style.paddingLeft = '1rem';
            } else if (heading.tagName === 'H4') {
                listItem.style.paddingLeft = '2rem';
            }

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    };

    // Highlight active TOC item
    const updateActiveTableOfContents = () => {
        const tocLinks = document.querySelectorAll('.toc-link');
        const headings = content.querySelectorAll('h2, h3, h4');
        
        let currentActive = null;

        headings.forEach((heading) => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentActive = document.querySelector(`a[href="#${heading.id}"]`);
            }
        });

        tocLinks.forEach(link => link.classList.remove('active'));
        if (currentActive) {
            currentActive.classList.add('active');
        }
    };

    // Smooth scroll for TOC links
    document.querySelector('.toc-list')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('toc-link')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Image Gallery
    const initializeGallery = () => {
        const gallery = document.querySelector('.post-gallery');
        if (!gallery) return;

        gallery.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (!galleryItem) return;

            const img = galleryItem.querySelector('img');
            if (!img) return;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            lightbox.addEventListener('click', (e) => {
                if (e.target !== img) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });
        });
    };

    // Initialize all features
    generateTableOfContents();
    initializeGallery();
    window.addEventListener('scroll', updateActiveTableOfContents);
});