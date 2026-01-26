document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // ============================================
    // Scroll Animations
    // ============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target || !header) return;

            e.preventDefault();
            const offset = target.offsetTop - header.offsetHeight;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    // ============================================
    // Active Navigation Link
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    if (sections.length) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const navLink = document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );
                if (!navLink) return;

                const sectionTop = section.offsetTop - 120;
                const sectionBottom = sectionTop + section.offsetHeight;

                navLink.classList.toggle(
                    'active',
                    scrollY >= sectionTop && scrollY < sectionBottom
                );
            });
        });
    }

    // ============================================
    // Init
    // ============================================
    document.body.classList.add('loaded');
    console.log('תבל - שרותי פוליגרף מתקדמים - האתר נטען בהצלחה');
});
// ============================================
// ADVANCED PAGE TRANSITIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Page load animation
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 20);
    
    // Handle link clicks
    const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href$=".html"]:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip anchor links and special links
            if (href.startsWith('#') || href.startsWith('tel:') || 
                href.startsWith('mailto:') || href.startsWith('https://wa.me')) {
                return;
            }
            
            e.preventDefault();
            
            // Add transition class
            document.body.classList.add('page-transitioning');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});
