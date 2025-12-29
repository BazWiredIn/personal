/**
 * Bazil Ahmad - Personal Website
 * Minimal JavaScript for navigation and interactions
 */

(function() {
    'use strict';

    // ---------- Navigation Active State ----------
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle hero section (when at top)
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    updateActiveNav();

    // ---------- Smooth Scroll (fallback for older browsers) ----------
    // Modern browsers handle this with CSS scroll-behavior: smooth
    // This is a fallback for browsers that don't support it
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ---------- Optional: Typing Effect for Hero (subtle) ----------
    // Uncomment if you want a typing effect on the hero terminal
    /*
    const heroTerminal = document.querySelector('.hero__terminal');
    if (heroTerminal) {
        const text = heroTerminal.textContent;
        heroTerminal.textContent = '';
        heroTerminal.style.visibility = 'visible';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTerminal.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    */

    // ---------- Console Easter Egg ----------
    console.log('%c> Hello, fellow developer!', 'color: #00ffd5; font-family: monospace; font-size: 14px;');
    console.log('%c> Feel free to check out the source code.', 'color: #ff00aa; font-family: monospace; font-size: 12px;');

})();
