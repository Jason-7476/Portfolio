// Configuration
const JSON_FILE = 'veille-articles.json';
let allArticles = [];
let currentFilter = 'all';

// Charger les articles depuis le JSON
async function loadArticles() {
    try {
        const response = await fetch(JSON_FILE);
        const data = await response.json();
        allArticles = data.articles;
        
        // Mettre à jour les statistiques
        updateStats(data);
        
        // Afficher les articles
        displayArticles(allArticles);
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        showError();
    }
}

// Mettre à jour les statistiques
function updateStats(data) {
    document.getElementById('totalArticles').textContent = data.articles.length;
    
    // Calculer le nombre de catégories uniques
    const categories = new Set(data.articles.map(a => a.category));
    document.getElementById('totalCategories').textContent = categories.size;
    
    // Formater la date de dernière mise à jour
    const lastUpdate = new Date(data.lastUpdate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('lastUpdate').textContent = lastUpdate.toLocaleDateString('fr-FR', options);
}

// Afficher les articles
function displayArticles(articles) {
    const container = document.getElementById('articlesContainer');
    const noArticles = document.getElementById('noArticles');
    
    if (articles.length === 0) {
        container.innerHTML = '';
        noArticles.style.display = 'block';
        return;
    }
    
    noArticles.style.display = 'none';
    
    container.innerHTML = articles.map(article => createArticleCard(article)).join('');
}

// Créer une carte d'article
function createArticleCard(article) {
    const categoryNames = {
        'infrastructure': 'Infrastructure',
        'cybersecurite': 'Cybersécurité',
        'cloud': 'Cloud Computing'
    };
    
    const categoryEmojis = {
        'infrastructure': '🖥️',
        'cybersecurite': '🔒',
        'cloud': '☁️'
    };
    
    const formattedDate = formatDate(article.date);
    
    return `
        <div class="article-card" data-category="${article.category}">
            <div class="article-image">
                ${article.imageUrl 
                    ? `<img src="${article.imageUrl}" alt="${article.title}">`
                    : `<div class="article-image-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>`
                }
                <div class="article-category-badge">
                    ${categoryEmojis[article.category]} ${categoryNames[article.category]}
                </div>
            </div>
            <div class="article-content">
                <div class="article-header">
                    <div class="article-date">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ${formattedDate}
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                </div>
                <p class="article-description">${article.description}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="article-footer">
                    <a href="${article.url}" target="_blank" class="article-btn">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Lire l'article
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Filtrer les articles
function filterArticles(category) {
    currentFilter = category;
    
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.filter-btn').classList.add('active');
    
    // Filtrer et afficher
    if (category === 'all') {
        displayArticles(allArticles);
    } else {
        const filtered = allArticles.filter(article => article.category === category);
        displayArticles(filtered);
    }
}

// Afficher une erreur
function showError() {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #ff6b6b;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 20px;">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
            </svg>
            <h3 style="font-size: 24px; margin-bottom: 10px;">Erreur de chargement</h3>
            <p style="color: #a0a0b0;">Impossible de charger les articles. Vérifiez que le fichier JSON existe.</p>
        </div>
    `;
}

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

// Event listeners pour les filtres
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = btn.getAttribute('data-filter');
            filterArticles(filter);
        });
    });
});

// Export pour utilisation avec API Perplexity (à implémenter)
async function updateArticlesFromAPI() {
    // TODO: Intégrer l'API Perplexity ici
    // Cette fonction sera appelée pour mettre à jour automatiquement les articles
    console.log('Fonction de mise à jour API à implémenter');
    
    /*
    Exemple d'utilisation future avec Perplexity API:
    
    const response = await fetch('https://api.perplexity.ai/...', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: 'Latest news about Windows Server 2025',
            // autres paramètres...
        })
    });
    
    const newArticles = await response.json();
    // Traiter et ajouter au JSON
    */
}