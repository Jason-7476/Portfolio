     src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
    
        // ⚙️ CONFIGURATION EMAILJS
        // Remplacez ces valeurs par vos identifiants EmailJS
        const EMAILJS_CONFIG = {
            publicKey: 'VOTRE_PUBLIC_KEY',     // Votre Public Key
            serviceID: 'VOTRE_SERVICE_ID',     // Votre Service ID
            templateID: 'VOTRE_TEMPLATE_ID'    // Votre Template ID
        };

        // Initialiser EmailJS
        emailjs.init(EMAILJS_CONFIG.publicKey);

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const alert = document.getElementById('alert');

        // Validation en temps réel
        const inputs = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };

        // Validation email
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // Validation champ
        function validateField(field) {
            const value = field.value.trim();
            const errorEl = document.getElementById(field.id + 'Error');

            if (field.id === 'email') {
                if (!value || !isValidEmail(value)) {
                    field.classList.add('error');
                    field.classList.remove('success');
                    errorEl.classList.add('show');
                    return false;
                }
            } else if (field.required || field.id === 'name' || field.id === 'subject' || field.id === 'message') {
                if (!value) {
                    field.classList.add('error');
                    field.classList.remove('success');
                    if (errorEl) errorEl.classList.add('show');
                    return false;
                }
            }

            field.classList.remove('error');
            field.classList.add('success');
            if (errorEl) errorEl.classList.remove('show');
            return true;
        }

        // Événements de validation
        Object.values(inputs).forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Afficher alerte
        function showAlert(message, type) {
            alert.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${type === 'success' 
                        ? '<path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                        : '<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
                    }
                </svg>
                <span>${message}</span>
            `;
            alert.className = `alert alert-${type} show`;
            
            setTimeout(() => {
                alert.classList.remove('show');
            }, 5000);
        }

        // Soumission du formulaire
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validation de tous les champs
            let isValid = true;
            Object.values(inputs).forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showAlert('Veuillez remplir tous les champs obligatoires correctement', 'error');
                return;
            }

            // Désactiver le bouton et afficher le spinner
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Préparer les données pour EmailJS
            const templateParams = {
                to_email: 'jason.boudet74@gmail.com',
                from_name: inputs.name.value.trim(),
                from_email: inputs.email.value.trim(),
                phone: document.getElementById('phone').value.trim() || 'Non renseigné',
                subject: inputs.subject.value.trim(),
                message: inputs.message.value.trim(),
                reply_to: inputs.email.value.trim()
            };

            try {
                // Envoi avec EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.serviceID,
                    EMAILJS_CONFIG.templateID,
                    templateParams
                );

                console.log('✅ Email envoyé avec succès!', response);
                
                // Message de succès
                showAlert('✅ Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
                form.reset();
                
                // Retirer les classes de validation
                Object.values(inputs).forEach(input => {
                    input.classList.remove('success', 'error');
                });

            } catch (error) {
                console.error('❌ Erreur d\'envoi:', error);
                showAlert('❌ Une erreur est survenue. Veuillez réessayer ou me contacter directement par email à jason.boudet74@gmail.com', 'error');
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });

        // Animation navbar au scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.pageYOffset > 100) {
                nav.style.background = 'rgba(10, 14, 39, 0.95)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(10, 14, 39, 0.9)';
                nav.style.boxShadow = 'none';
            }
        });