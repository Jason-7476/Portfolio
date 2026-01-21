       // Création des particules animées
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

        // Navigation smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Animation au scroll pour la navbar
        let lastScroll = 0;
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

            lastScroll = currentScroll;
        });