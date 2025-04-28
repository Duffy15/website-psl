document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeNavBtn = document.querySelector('.close-nav');
    const overlayNavLinks = document.querySelectorAll('.overlay-nav ul li a');
    const body = document.body;

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
    }
    if (overlayNavLinks.length > 0) {
        overlayNavLinks.forEach(link => {
            link.addEventListener('click', closeOverlay); // Close when any overlay link is clicked
        });
    }

    // --- Fade-in Animation on Scroll ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                // Check if element is intersecting and not already visible
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                     console.log('Element intersecting:', entry.target); // Optional Debug Log
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation to save resources,
                    // but keep observing if re-animation on scroll up is desired.
                    // observer.unobserve(entry.target);
                }
                 // Optional: remove 'visible' if scrolling up past element
                 // else if (!entry.isIntersecting && entry.target.classList.contains('visible')) {
                 //     entry.target.classList.remove('visible');
                 // }
            });
        }, {
            rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% into view from bottom
            threshold: 0 // As soon as any part enters viewport based on rootMargin
         });

        fadeInSections.forEach(section => {
            if (section) {
                sectionObserver.observe(section);
            }
        });
    } else {
        console.log('No .fade-in-section elements found.');
    }

    // --- Active Navigation Link Highlighting ---
    // (Simple version based on current URL)
    try {
        const currentLocation = window.location.pathname.split('/').pop(); // Gets the filename e.g., "about.html" or "" for index
        const navLinks = document.querySelectorAll('.main-nav ul li a');
        const mobileNavLinks = document.querySelectorAll('.overlay-nav ul li a');

        const setActive = (links) => {
             links.forEach(link => {
                const linkHref = link.getAttribute('href').split('/').pop();
                link.classList.remove('active'); // Remove active from all
                // Handle index page case (currentLocation is "" or "index.html")
                if ((currentLocation === "" || currentLocation === "index.html") && (linkHref === "" || linkHref === "index.html")) {
                    link.classList.add('active');
                } else if (currentLocation !== "" && currentLocation !== "index.html" && linkHref === currentLocation) {
                     link.classList.add('active');
                }
            });
        };

        setActive(navLinks);
        setActive(mobileNavLinks);

    } catch (e) {
        console.error("Error highlighting navigation:", e);
    }


}); // End DOMContentLoaded listener
