// Data for Services (Nested Structure)
const servicesData = {
    men: {
        "Hair Cuts & Styling": [
            { name: "Haircut - Stylist", price: "₹220", icon: "✂️" },
            { name: "Haircut - Senior Stylist", price: "₹350", icon: "✂️" },
            { name: "Kids Cut (Below 10)", price: "₹180", icon: "👶" },
            { name: "Head Shave", price: "₹250", icon: "✂️" },
            { name: "Hair Wash & Style", price: "₹150", icon: "🧴" }
        ],
        "Beard Services": [
            { name: "Beard Trim", price: "₹150", icon: "🧔" },
            { name: "Beard Shape Up", price: "₹220", icon: "📏" },
            { name: "Clean Shave", price: "₹110", icon: "🪒" }
        ],
        "Hair Color": [
            { name: "Global Natural Color", price: "₹900", icon: "🎨" },
            { name: "Global Fashion Color", price: "₹1600", icon: "🌈" },
            { name: "Highlights", price: "₹2000+", icon: "✨" }
        ],
        "Massage & Spa": [
            { name: "Head Massage (30min)", price: "₹599", icon: "💆" },
            { name: "Face Clean Up", price: "₹600", icon: "✨" }
        ]
    },
    women: {
        "Hair Cuts": [
            { name: "Hair Trim", price: "₹400", icon: "✂️" },
            { name: "Layer Cut", price: "₹650", icon: "💇‍♀️" },
            { name: "Advanced Layer (Creative Dir)", price: "₹1500", icon: "⭐" },
            { name: "Bangs/Fringe", price: "₹150", icon: "✂️" }
        ],
        "Hair Treatments": [
            { name: "Hair Spa (Medium)", price: "₹480", icon: "🧴" },
            { name: "Keratin Treatment", price: "₹4499+", icon: "✨" },
            { name: "Smoothening", price: "₹3500+", icon: "🧴" },
            { name: "Botox Treatment", price: "₹5000+", icon: "💉" }
        ],
        "Makeover & Color": [
            { name: "Party Makeover", price: "₹3399", icon: "💄" },
            { name: "Bridal Makeup", price: "₹14999", icon: "👰" },
            { name: "Global Hair Color", price: "₹2500+", icon: "🎨" }
        ]
    },
    spa: {
        "Manicure & Pedicure": [
            { name: "Classic Manicure", price: "₹450", icon: "💅" },
            { name: "Spa Pedicure", price: "₹900", icon: "🦶" },
            { name: "Nail Art", price: "₹700+", icon: "🎨" }
        ],
        "Body Therapies": [
            { name: "Aroma Therapy (60min)", price: "₹2400", icon: "🕯️" },
            { name: "Swedish Massage", price: "₹2800", icon: "💆‍♀️" },
            { name: "Body Polish", price: "₹3000", icon: "✨" }
        ]
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderServices('men'); // Render default tab preview
    setupEventListeners();
    animateIntro();
});

// Render Services Preview (Tab View - Shows only top 5 from first category)
function renderServices(category) {
    const listContainer = document.getElementById('services-list');
    const categoryData = servicesData[category];

    // Get first subcategory items for preview
    const firstSubcatKey = Object.keys(categoryData)[0];
    const services = categoryData[firstSubcatKey].slice(0, 5); // Show top 5

    listContainer.style.opacity = '0';

    setTimeout(() => {
        listContainer.innerHTML = services.map((service, index) => `
            <div class="service-item" style="animation-delay: ${index * 0.1}s">
                <div class="service-details">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:1.2rem">${service.icon}</span>
                        <h4>${service.name}</h4>
                    </div>
                </div>
                <div class="service-price">${service.price}</div>
            </div>
        `).join('') + `
            <div style="text-align:center; margin-top:15px; animation: fadeIn 0.5s ease 0.5s backwards;">
                <button onclick="openFullMenu('${category}')" class="btn-glass" style="width:100%; padding:15px; border-radius:15px;">
                    View All ${category.charAt(0).toUpperCase() + category.slice(1)} Services
                </button>
            </div>
        `;

        listContainer.style.opacity = '1';
    }, 300);

    // Update Tab Status
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) btn.classList.add('active');
    });
}

// FULL MENU LOGIC
function openFullMenu(initialCategory) {
    const overlay = document.getElementById('full-menu-overlay');
    const container = document.getElementById('full-menu-list');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderFullMenu(initialCategory);

    // Set active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === initialCategory) btn.classList.add('active');
    });
}

function closeFullMenu() {
    document.getElementById('full-menu-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderFullMenu(categoryFilter = 'all') {
    const container = document.getElementById('full-menu-list');
    const searchTerm = document.getElementById('service-search').value.toLowerCase();

    let html = '';

    // Iterate through all main categories if 'all' or specific one
    Object.keys(servicesData).forEach(mainCat => {
        if (categoryFilter !== 'all' && mainCat !== categoryFilter) return;

        const subcats = servicesData[mainCat];

        // Render Main Category Header if showing multiple
        if (categoryFilter === 'all') {
            html += `<h2 class="menu-main-cat">${mainCat.toUpperCase()}</h2>`;
        }

        Object.keys(subcats).forEach(subCat => {
            const items = subcats[subCat].filter(item =>
                item.name.toLowerCase().includes(searchTerm)
            );

            if (items.length > 0) {
                html += `
                    <div class="menu-group">
                        <h3 class="menu-subcat-title">${subCat}</h3>
                        <div class="menu-items">
                            ${items.map(item => `
                                <div class="menu-item">
                                    <div class="menu-item-info">
                                        <span class="menu-item-icon">${item.icon}</span>
                                        <span class="menu-item-name">${item.name}</span>
                                    </div>
                                    <span class="menu-item-price">${item.price}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });
    });

    if (html === '') {
        html = '<div style="text-align:center; padding:40px; color:#666;">No services found matching your search.</div>';
    }

    container.innerHTML = html;
}


// Event Listeners
function setupEventListeners() {
    // Tab Switching (Home)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            renderServices(btn.dataset.category);
        });
    });

    // Share Button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'FAVEW SALON',
                        text: 'Check out Favew Salon - Where Beauty Meets Excellence!',
                        url: window.location.href
                    });
                } catch (err) { }
            } else {
                alert('Copy link: ' + window.location.href);
            }
        });
    }

    // Full Menu Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFullMenu(btn.dataset.category);
        });
    });

    // Search Input
    document.getElementById('service-search').addEventListener('input', () => {
        const activeCat = document.querySelector('.filter-btn.active').dataset.category;
        renderFullMenu(activeCat);
    });
}

// vCard Logic
function downloadVCard() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Salon;Favew;;;
FN:Favew Salon
ORG:Favew Salon
TEL;TYPE=WORK,VOICE:+917560920774
EMAIL;TYPE=WORK:contact@unisexbeauty.com
URL:${window.location.href}
ADR;TYPE=WORK:;;Payyannur, Kannur 670307;;;
NOTE:Where Beauty Meets Excellence
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favew-salon.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Intro Animation
function animateIntro() {
    const hero = document.querySelector('.hero-section');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        hero.style.transition = 'all 0.8s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
}
