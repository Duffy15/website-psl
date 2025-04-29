document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeNavBtn = document.querySelector('.close-nav');
    const overlayNavLinks = document.querySelectorAll('.overlay-nav ul li a');
    const body = document.body;
    const header = document.querySelector('.main-header'); // Needed for offset calc maybe later

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Hamburger Menu Toggle ---
    if (hamburgerBtn && mobileNavOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('overlay-active');
            body.classList.add('overlay-open'); // Prevent body scroll
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        });
    } else {
        if (!hamburgerBtn) console.log("Debug: Hamburger button not found."); // Use log instead of error
        if (!mobileNavOverlay) console.log("Debug: Mobile nav overlay not found.");
    }

    // --- Function to Close Overlay ---
    function closeOverlay() {
        if (mobileNavOverlay && hamburgerBtn) {
            mobileNavOverlay.classList.remove('overlay-active');
            body.classList.remove('overlay-open'); // Re-enable body scroll
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // --- Close Overlay Event Listeners ---
    if (closeNavBtn) {
        closeNavBtn.addEventListener('click', closeOverlay);
    } else {
        console.log("Debug: Close nav button not found.");
    }
    // Close overlay if a link inside it is clicked
    if (overlayNavLinks.length > 0) {
        overlayNavLinks.forEach(link => {
            link.addEventListener('click', closeOverlay);
        });
    }

    // --- Fade-in Animation on Scroll ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Optional Debug Log: console.log('Element intersecting:', entry.target);
                    entry.target.classList.add('visible');
                    // Keep observing if you want animations to replay if scrolled out/in
                    // observer.unobserve(entry.target); // Uncomment to animate only once
                }
                // Optional: remove 'visible' if scrolling up past element
                // else if (!entry.isIntersecting && entry.target.classList.contains('visible')) {
                //     entry.target.classList.remove('visible');
                // }
            });
        }, {
            rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% into view
            threshold: 0
         });

        fadeInSections.forEach(section => {
            if (section) {
                sectionObserver.observe(section);
            }
        });
    } else {
        console.log('Debug: No .fade-in-section elements found.');
    }


    // --- Active Navigation Link Highlighting ---
    try {
        const currentLocation = window.location.pathname.split('/').pop();
        // Handle index default page correctly
        const currentPage = (currentLocation === "" || currentLocation === "index.html") ? "index.html" : currentLocation;

        const navLinks = document.querySelectorAll('.main-nav ul li a');
        const mobileNavLinks = document.querySelectorAll('.overlay-nav ul li a');

        const setActive = (links) => {
             links.forEach(link => {
                const linkHref = link.getAttribute('href').split('/').pop();
                const linkPage = (linkHref === "" || linkHref === "index.html") ? "index.html" : linkHref;

                link.classList.remove('active'); // Remove active from all first
                if (linkPage === currentPage) {
                     link.classList.add('active');
                }
            });
        };

        setActive(navLinks);
        setActive(mobileNavLinks);

    } catch (e) {
        console.error("Error highlighting navigation:", e);
    }

/* --- START: Hero Background Slideshow --- */
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length > 1) { // Only run if there's more than one slide
        let currentSlideIndex = 0;
        const slideInterval = 60000; // Time each slide is visible (milliseconds) e.g., 60 seconds

        // Function to change slide
        function changeHeroSlide() {
            // Remove active class from current slide
            if (heroSlides[currentSlideIndex]) {
                heroSlides[currentSlideIndex].classList.remove('active');
            }

            // Move to the next slide index, looping back to 0
            currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;

            // Add active class to the new current slide
            if (heroSlides[currentSlideIndex]) {
                heroSlides[currentSlideIndex].classList.add('active');
            }
        }

        // Start the slideshow
        // Ensure the first slide is visible initially (set in HTML already)
        // Set interval to change slides
        setInterval(changeHeroSlide, slideInterval);
        console.log('Hero slideshow initialized.');

    } else {
        // If only one slide, make sure it's visible
        if (heroSlides.length === 1) {
            heroSlides[0].classList.add('active');
        }
        console.log('Debug: Hero slideshow needs more than one .hero-bg-slide element to run.');
    }
    /* --- END: Hero Background Slideshow --- */

    
    /* --- START: Swiper Slider Initialization --- */
    // Check if we are on a page that actually has the slider container
    const swiperContainer = document.querySelector('.featured-swiper-container');
    if (swiperContainer) {
        try {
            const swiper = new Swiper('.featured-swiper-container', {
                // Parameters
                direction: 'horizontal',
                loop: true, // Enable infinite loop
                slidesPerView: 'auto', // Show slides based on their CSS width
                spaceBetween: 20, // Gap between slides
                grabCursor: true,
                centeredSlides: false, // Set to true if you want active slide centered

                // Autoplay configuration
                autoplay: {
                  delay: 4000, // Longer delay between slides
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                },

                 // Breakpoints for responsive adjustments
                 breakpoints: {
                    // Mobile first approach (default is 'auto')
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                    1200: { slidesPerView: 5, spaceBetween: 20 }
                  }
            });
            console.log('Swiper slider initialized.');
        } catch (e) {
            console.error("Error initializing Swiper:", e);
        }
    } else {
         console.log('Debug: Swiper container (.featured-swiper-container) not found on this page.');
    }
    /* --- END: Swiper Slider Initialization --- */


    // --- Contact Form Handling Placeholder ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Add your form submission logic here (e.g., using Fetch API or AJAX)
            // You will need a backend endpoint or service to send the data to.
            console.log('Form submitted (frontend placeholder)');
            alert('Dziękujemy za wiadomość! (Potwierdzenie tymczasowe)'); // Temporary confirmation
            // contactForm.reset(); // Optional: Clear form after submission
        });
    }

}); // End DOMContentLoaded listener
