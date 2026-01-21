        // Création des particules
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            particlesContainer.appendChild(particle);
        }

        // Animation des barres de compétences
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                                            observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        // Animation navbar au scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                nav.style.background = 'rgba(10, 14, 39, 0.95)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(10, 14, 39, 0.8)';
                nav.style.boxShadow = 'none';
            }
        });

        // Animation au scroll pour les cartes
        const fadeInElements = document.querySelectorAll('.about-content, .stat-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            fadeObserver.observe(el);
        });