// The Megalodon Market - Shopping Cart
const CART_KEY = 'megalodon_cart';

// Product catalog
const PRODUCTS = {
  'wireless-earbuds': { id: 'wireless-earbuds', name: 'Megalodon Wireless Earbuds', price: 49.99, emoji: '🎧', category: 'electronics' },
  'smart-watch': { id: 'smart-watch', name: 'Deep Sea Smart Watch', price: 129.99, emoji: '⌚', category: 'electronics' },
  'tablet': { id: 'tablet', name: 'Ocean View Tablet', price: 249.99, emoji: '📱', category: 'electronics' },
  'blender': { id: 'blender', name: 'Shark Blender Pro', price: 79.99, emoji: '🥤', category: 'home' },
  'throw-pillows': { id: 'throw-pillows', name: 'Coastal Throw Pillows (Set of 4)', price: 39.99, emoji: '🛋️', category: 'home' },
  'lamp': { id: 'lamp', name: 'Coral Reef Desk Lamp', price: 54.99, emoji: '💡', category: 'home' },
  'hoodie': { id: 'hoodie', name: 'Megalodon Logo Hoodie', price: 44.99, emoji: '👕', category: 'clothing' },
  'cap': { id: 'cap', name: 'Technosaurus Rex Cap', price: 24.99, emoji: '🧢', category: 'clothing' },
  'mug': { id: 'mug', name: 'Meg Bite Ceramic Mug', price: 16.99, emoji: '☕', category: 'home' },
  'plush': { id: 'plush', name: 'Megalodon Plush Toy', price: 29.99, emoji: '🦈', category: 'toys' },
  'puzzle': { id: 'puzzle', name: 'Deep Ocean 1000-Piece Puzzle', price: 19.99, emoji: '🧩', category: 'toys' },
  'frisbee': { id: 'frisbee', name: 'Shark Fin Frisbee', price: 14.99, emoji: '🥏', category: 'sports' },
  'water-bottle': { id: 'water-bottle', name: 'Hydro Shark Water Bottle', price: 22.99, emoji: '🥤', category: 'sports' },
};

function getCart() {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCount() {
  const els = document.querySelectorAll('.cart-count');
  const count = getCartCount();
  els.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline' : 'none';
  });
}

function initCartUI() {
  updateCartCount();
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.dataset.productId;
      addToCart(productId);
      this.textContent = 'Added!';
      this.classList.add('added');
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.classList.remove('added');
      }, 1500);
    });
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCartCount);
} else {
  updateCartCount();
}
