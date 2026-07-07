/* app.js - v1.0.3 */
/* Developed for skunkbones.com - Midcoast Maine Skunk Bones */

// 1. Product Database
const products = [
    {
        id: 'skull',
        name: 'The Sovereign Skunk Skull',
        category: 'craniums',
        price: 149.00,
        image: 'assets/hero_skunk_skull.jpg',
        badge: 'Best Seller',
        description: 'A masterpiece of natural engineering. This pristine cranium exhibits remarkable calcium density and has been bleached to a fine matte finish. Mounted on a hand-carved pine block.'
    },
    {
        id: 'metatarsal',
        name: 'The Maine-Ly Metatarsal',
        category: 'limbs',
        price: 19.00,
        image: 'assets/bone_collection.jpg',
        badge: 'Popular',
        description: 'An elegant metatarsal bone salvaged near Linekin Bay. Light, smooth, and highly polished by the coastal sand gales. Fits comfortably in a pocket as a Maine lucky charm.'
    },
    {
        id: 'vertebra',
        name: 'The Whispering Vertebra',
        category: 'vertebrae',
        price: 24.00,
        image: 'assets/bone_collection.jpg',
        badge: 'Aromatic Cured',
        description: 'A perfectly preserved lumbar vertebra. Cured in wild rosemary and ocean fog. Sailors traditionally kept these in their oilskins to predict oncoming cold fronts.'
    },
    {
        id: 'ribcage',
        name: 'The Midcoast Ribcage Ensemble',
        category: 'sets',
        price: 299.00,
        image: 'assets/bone_collection.jpg',
        badge: 'Rare Find',
        description: 'A beautifully reconstructed, semi-complete rib structure. Elegant and symmetrical. Discovered beneath a moss bed near Southport. Packaged in a glass display dome.'
    },
    {
        id: 'femur',
        name: 'The Fog-Kissed Femur',
        category: 'limbs',
        price: 35.00,
        image: 'assets/bone_collection.jpg',
        badge: 'Limited Run',
        description: 'A robust femur bone showing thick cortical walls—a biological marker of a hearty diet of wharf lobster claws and crab remnants. Includes a wooden specimen tag.'
    },
    {
        id: 'starter_kit',
        name: 'The Skeletal Starter Kit',
        category: 'sets',
        price: 499.00,
        image: 'assets/bone_collection.jpg',
        badge: 'Curator Choice',
        description: 'A premium wooden chest containing 12 distinct, ethically salvaged bones. Hand-classified by Captain Barnaby Higgins. Includes a signed magnifying glass and brass tweezers.'
    }
];

// 2. Trivia Facts Database
const triviaFacts = [
    {
        title: "1. The High-Calcium Lobster Diet",
        text: "Maine's coastal skunks feed extensively on lobster shell remains discarded near fishing wharves. This shell consumption results in a bone matrix that has 14% higher calcium content and a distinct natural luster compared to inland skunks.",
        extra: "Locals refer to this as the 'Boothbay Pearlescence'."
    },
    {
        title: "2. Scent-Free Guarantee",
        text: "Despite the skunk's signature defensive spray, their skeletal system does not absorb or retain any musk. Furthermore, our bones undergo a 30-day ozone and wind-bleaching cycle on coastal racks, leaving them completely odorless.",
        extra: "Zero odor. 100% organic texture."
    },
    {
        title: "3. 180-Degree Spine Flexibility",
        text: "The articulation points of the skunk's lumbar vertebrae are exceptionally wide. This anatomical trait lets the skunk turn its torso 180 degrees, allowing it to look backward and aim its scent glands simultaneously.",
        extra: "A marvel of defensive biomechanics."
    },
    {
        title: "4. The Sagittal Crest Anchor",
        text: "A prominent ridge of bone runs along the top of mature skunk skulls. This ridge, called the sagittal crest, acts as a powerful anchor point for muscles, giving skunks the jaw strength to crunch lobster claws.",
        extra: "Specimens with larger crests are prized by collectors."
    }
];

// 3. State Exclusions
const EXCLUDED_STATES = ['CA', 'NY', 'TX', 'GA', 'HI', 'WA', 'CT'];

// Default Google Sheets logging endpoint
const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbze7b0KrcTavybRiTVgfSGbGqDjY98cNzQXGd-CuFnbvxQyr65LflJhANBK3kFNiPuWlA/exec';

// 4. Cart & UI State
let cart = [];
let currentCategory = 'all';

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    loadSheetUrl();
    
    // Check hash for page routing
    window.addEventListener('hashchange', handleHashRouting);
    handleHashRouting();
});

// Navigation & Simulated Routing
function navigateTo(pageId) {
    // Update navigation active states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        // Match href to pageId
        if (item.getAttribute('href') === `#${pageId === 'home' ? 'shop' : pageId}`) {
            item.classList.add('active');
        }
    });

    // Hide all pages, show selected
    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${pageId}`);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function handleHashRouting() {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'story') {
        navigateTo('story');
    } else if (hash === 'legality') {
        navigateTo('legality');
    } else if (hash === 'facts') {
        navigateTo('facts');
    } else {
        navigateTo('home');
    }
}

function scrollToProducts() {
    const el = document.getElementById('products-grid');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// Render Products to Grid
function renderProducts() {
    const container = document.getElementById('shop-products');
    if (!container) return;

    container.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-badge">${product.badge}</div>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Category Filter Switcher
function filterCategory(category) {
    currentCategory = category;
    
    // Update active filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        }
    });

    renderProducts();
}

// Cart Management
function toggleCart(isOpen) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if (isOpen) {
        renderCartItems();
        drawer.classList.add('active');
        overlay.classList.add('active');
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartCount();
    toggleCart(true); // Slide open cart to show item added
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        renderCartItems();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function getSubtotal() {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const subtotalPriceEl = document.getElementById('cart-subtotal-price');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart-msg">Your cart is empty. Add a Maine specimen to begin.</div>';
        subtotalPriceEl.textContent = '$0.00';
        return;
    }

    container.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity('${item.product.id}', -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.product.id}', 1)">+</button>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.product.id}')">Remove</button>
            </div>
        `;
        container.appendChild(itemEl);
    });

    subtotalPriceEl.textContent = `$${getSubtotal().toFixed(2)}`;
}

// Checkout Modal Actions
function openCheckout() {
    if (cart.length === 0) {
        alert("Please add items to your cart before checking out.");
        return;
    }
    
    // Close cart drawer
    toggleCart(false);

    // Open checkout modal
    const modal = document.getElementById('checkout-modal');
    modal.classList.add('active');

    // Reset error box
    const alertBox = document.getElementById('checkout-alert-box');
    alertBox.classList.add('hidden');
    alertBox.textContent = '';

    // Render checkout summary
    const listContainer = document.getElementById('checkout-items-list');
    listContainer.innerHTML = '';
    
    cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'checkout-item-row';
        row.innerHTML = `
            <span>${item.product.name} (x${item.quantity})</span>
            <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
        `;
        listContainer.appendChild(row);
    });

    const total = getSubtotal();
    document.getElementById('checkout-grand-total').textContent = `$${total.toFixed(2)}`;
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// Shipping State Check
function validateStateSelection() {
    const stateSelect = document.getElementById('checkout-state');
    const alertBox = document.getElementById('checkout-alert-box');
    const submitBtn = document.getElementById('submit-order-button');
    const selectedState = stateSelect.value;

    if (EXCLUDED_STATES.includes(selectedState)) {
        alertBox.textContent = `Regulatory Block: Shipments of wild furbearer skeletons to ${selectedState} are restricted by local statutes. Please choose a different shipping address.`;
        alertBox.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        alertBox.classList.add('hidden');
        alertBox.textContent = '';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

// Submit Checkout
function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const address = document.getElementById('checkout-address').value;
    const city = document.getElementById('checkout-city').value;
    const state = document.getElementById('checkout-state').value;
    const zip = document.getElementById('checkout-zip').value;
    
    // Extra validation
    if (EXCLUDED_STATES.includes(state)) {
        validateStateSelection();
        return;
    }

    const itemsSummary = cart.map(item => `${item.product.name} (Qty: ${item.quantity})`).join(', ');
    const totalCost = `$${getSubtotal().toFixed(2)}`;

    const orderPayload = {
        name,
        email,
        address,
        city,
        state,
        zip,
        items: itemsSummary,
        total: totalCost
    };

    // Close checkout
    closeCheckout();

    // Open Success Modal
    openSuccessModal(orderPayload);
}

function openSuccessModal(order) {
    const modal = document.getElementById('success-modal');
    modal.classList.add('active');

    // Fill details
    document.getElementById('success-name').textContent = order.name;
    document.getElementById('success-address').textContent = `${order.address}, ${order.city}, ${order.state} ${order.zip}`;
    document.getElementById('success-total').textContent = order.total;
    document.getElementById('success-items').textContent = order.items;

    const sheetStatusEl = document.getElementById('success-sheet-status');
    const sheetUrl = localStorage.getItem('skunkbones_sheet_url') || DEFAULT_SHEET_URL;

    if (!sheetUrl) {
        sheetStatusEl.textContent = 'Skipped (No Sheet URL configured)';
        sheetStatusEl.style.color = '#777';
    } else {
        sheetStatusEl.textContent = 'Transmitting order data...';
        sheetStatusEl.style.color = 'orange';

        // POST request to Google Sheet Web App
        fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors', // Standard Google Script endpoint bypass for simple CORS
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(() => {
            sheetStatusEl.textContent = 'Transmitted successfully (logged to Google Sheet!)';
            sheetStatusEl.style.color = 'var(--success-color)';
        })
        .catch(err => {
            console.error('Sheet Logging Error:', err);
            sheetStatusEl.textContent = 'Transmission error (Check console or script permissions)';
            sheetStatusEl.style.color = 'var(--error-color)';
        });
    }

    // Clear cart
    cart = [];
    updateCartCount();
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('active');
}

// Google Sheets Dev Configuration Tool
function openSheetsModal() {
    const modal = document.getElementById('sheets-modal');
    modal.classList.add('active');
}

function closeSheetsModal() {
    document.getElementById('sheets-modal').classList.remove('active');
}

function saveSheetUrl() {
    const input = document.getElementById('sheet-url-input');
    const status = document.getElementById('sheet-save-status');
    const url = input.value.trim();

    if (url === '') {
        localStorage.removeItem('skunkbones_sheet_url');
        status.textContent = 'Configuration cleared.';
        status.className = 'save-status-msg';
        return;
    }

    if (!url.startsWith('https://script.google.com/')) {
        status.textContent = 'Invalid Web App URL. It must begin with https://script.google.com/';
        status.className = 'save-status-msg error';
        return;
    }

    localStorage.setItem('skunkbones_sheet_url', url);
    status.textContent = 'Google Sheet Web App URL saved successfully!';
    status.className = 'save-status-msg success';
    setTimeout(() => {
        status.textContent = '';
    }, 4000);
}

function loadSheetUrl() {
    const url = localStorage.getItem('skunkbones_sheet_url') || DEFAULT_SHEET_URL;
    if (url) {
        const input = document.getElementById('sheet-url-input');
        if (input) input.value = url;
    }
}

// Fun Facts Hotspot Handler
function showFact(index) {
    const fact = triviaFacts[index];
    if (!fact) return;

    const displayBox = document.getElementById('fact-display');
    const titleEl = document.getElementById('fact-title');
    const textEl = document.getElementById('fact-text');
    const extraEl = document.getElementById('fact-extra');

    titleEl.textContent = fact.title;
    textEl.textContent = fact.text;
    extraEl.textContent = fact.extra;

    // Highlight display box briefly
    displayBox.style.borderColor = 'var(--accent-color)';
    displayBox.style.boxShadow = '0 0 10px rgba(197, 168, 128, 0.4)';
    
    setTimeout(() => {
        displayBox.style.borderColor = 'var(--border-color)';
        displayBox.style.boxShadow = 'none';
    }, 800);
}
