/**
 * ============================================================
 *  CREPES - 50 QƏPİK LƏNKƏRAN  |  app.js
 * ============================================================
 *  WHATSAPP NÖMRƏLƏRI:
 *    ORDER_WA   — Sifariş/Sifariş nömrəsi
 *    RESERVE_WA — Rezervasiya nömrəsi
 * ============================================================
 */

// ── WhatsApp nömrələri (yalnız rəqəm, "+" olmadan) ──────────
const ORDER_WA   = '994559406018';  // Sifariş
const RESERVE_WA = '994559406018';  // Rezervasiya

// ── Dövlət ──────────────────────────────────────────────────
let cart = {};           // { id: { item, qty } }
let activeCat = 'sirin'; // aktiv kateqoriya
let currentModal = null; // açıq modalın məhsulu
let userLocationLink = null; // konum linki

// Qalerya lightbox
let lbImages = [];
let lbIndex  = 0;
let lbStartX = 0;

// ── DOM Referansları ─────────────────────────────────────────
const menuGrid      = document.getElementById('menuGrid');
const cartBar       = document.getElementById('cartBar');
const cartCount     = document.getElementById('cartCount');
const cartTotal     = document.getElementById('cartTotal');
const galleryGrid   = document.getElementById('galleryGrid');
const faqList       = document.getElementById('faqList');
const lightbox      = document.getElementById('lightbox');
const lbImg         = document.getElementById('lbImg');
const lbCaption     = document.getElementById('lbCaption');
const modalOverlay  = document.getElementById('modalOverlay');
const toast         = document.getElementById('toast');
const navMenu       = document.getElementById('navMenu');
const navToggle     = document.getElementById('navToggle');
const orderItemsList = document.getElementById('orderItemsList');
const orderSummary   = document.getElementById('orderSummary');
const orderTotal     = document.getElementById('orderTotal');
const emptyCartMsg   = document.getElementById('emptyCartMsg');

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildMenu(activeCat);
  buildGallery();
  buildFAQ();
  bindMenuTabs();
  bindNavToggle();
  bindForms();
  setMinDate();
  updateCartUI();
});

// ============================================================
//  NAVIGATION
// ============================================================
function navigateTo(pageId) {
  // Close mobile nav
  navMenu.classList.remove('open');

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Update bottom nav
  document.querySelectorAll('.bn-item').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });

  // If order page — sync cart
  if (pageId === 'sifaris') renderOrderItems();
}

// Handle URL hash
function routeFromHash() {
  const hash = location.hash.replace('#', '') || 'haqqinda';
  navigateTo(hash);
}

window.addEventListener('hashchange', routeFromHash);
window.addEventListener('load', routeFromHash);

// ── Nav toggle ───────────────────────────────────────────────
function bindNavToggle() {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      location.hash = '#' + page;
      navigateTo(page);
    });
  });
}

// ============================================================
//  MENU BUILD
// ============================================================
function buildMenu(catId) {
  const cat = MENU_DATA.find(c => c.id === catId);
  if (!cat) return;

  menuGrid.innerHTML = '';

  cat.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', item.name);

    card.innerHTML = `
      <div class="menu-card-img-wrap">
        <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy" />
        ${item.popular ? '<span class="popular-badge">⭐ POPULYAR</span>' : ''}
        <button class="menu-card-add" onclick="quickAdd(event,'${item.id}')" aria-label="Səbətə əlavə et">+</button>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-price">${formatPrice(item.price)}</div>
      </div>
    `;

    card.addEventListener('click', () => openModal(item.id));
    menuGrid.appendChild(card);
  });
}

function bindMenuTabs() {
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeCat = tab.dataset.cat;
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      buildMenu(activeCat);
    });
  });
}

// ============================================================
//  CART
// ============================================================
function quickAdd(e, itemId) {
  e.stopPropagation();
  addToCart(itemId);
}

function addToCart(itemId) {
  const item = findItem(itemId);
  if (!item) return;

  if (cart[itemId]) {
    cart[itemId].qty++;
  } else {
    cart[itemId] = { item, qty: 1 };
  }

  updateCartUI();
  showToast(`"${item.name}" səbətə əlavə edildi 🛒`);

  // If modal is open — close it and go to order section after add
}

function removeFromCart(itemId) {
  if (!cart[itemId]) return;
  if (cart[itemId].qty > 1) {
    cart[itemId].qty--;
  } else {
    delete cart[itemId];
  }
  updateCartUI();
  renderOrderItems();
}

function clearCart() {
  cart = {};
  updateCartUI();
  renderOrderItems();
}

function updateCartUI() {
  const total = getCartTotal();
  const count = getCartCount();

  if (count > 0) {
    cartBar.classList.add('show');
    cartCount.textContent = `${count} məhsul`;
    cartTotal.textContent = formatPrice(total);
  } else {
    cartBar.classList.remove('show');
  }
}

function getCartTotal() {
  return Object.values(cart).reduce((s, e) => s + e.item.price * e.qty, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((s, e) => s + e.qty, 0);
}

function renderOrderItems() {
  const entries = Object.values(cart);
  orderItemsList.innerHTML = '';

  if (entries.length === 0) {
    orderSummary.style.display = 'none';
    orderItemsList.appendChild(emptyCartMsg);
    emptyCartMsg.style.display = 'block';
    return;
  }

  emptyCartMsg.style.display = 'none';
  orderSummary.style.display = 'block';

  entries.forEach(({ item, qty }) => {
    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.innerHTML = `
      <span class="oi-name">${item.name}</span>
      <div class="oi-qty-ctrl">
        <button class="oi-qty-btn" onclick="removeFromCart('${item.id}')">−</button>
        <span class="oi-qty">${qty}</span>
        <button class="oi-qty-btn" onclick="addToCart('${item.id}')">+</button>
      </div>
      <span class="oi-price">${formatPrice(item.price * qty)}</span>
      <button class="oi-remove" onclick="deleteFromCart('${item.id}')">🗑</button>
    `;
    orderItemsList.appendChild(row);
  });

  const total = getCartTotal();
  orderTotal.textContent = formatPrice(total);
}

function deleteFromCart(itemId) {
  delete cart[itemId];
  updateCartUI();
  renderOrderItems();
}

// Manual add
function toggleManualAdd() {
  const sec = document.getElementById('manualAddSection');
  sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
}

function addManualItem() {
  const nameEl = document.getElementById('manualItem');
  const qtyEl  = document.getElementById('manualQty');
  const name = nameEl.value.trim();
  const qty  = parseInt(qtyEl.value) || 1;

  if (!name) { showToast('Məhsul adını daxil edin'); return; }

  const fakeId = 'manual_' + Date.now();
  cart[fakeId] = {
    item: { id: fakeId, name, price: 0 },
    qty
  };

  nameEl.value = '';
  qtyEl.value  = '1';
  updateCartUI();
  renderOrderItems();
  showToast(`"${name}" əlavə edildi`);
}

// ============================================================
//  INGREDIENT MODAL
// ============================================================
function openModal(itemId) {
  const item = findItem(itemId);
  if (!item) return;
  currentModal = item;

  document.getElementById('modalImg').src = item.img;
  document.getElementById('modalImg').alt = item.name;
  document.getElementById('modalName').textContent = item.name;
  document.getElementById('modalIngredients').textContent = '🧾 Tərkib: ' + item.desc;
  document.getElementById('modalPrice').textContent = formatPrice(item.price);

  const btn = document.getElementById('modalOrderBtn');
  btn.onclick = () => {
    addToCart(item.id);
    closeModal();
  };

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  currentModal = null;
}

// ============================================================
//  GALLERY
// ============================================================
function buildGallery() {
  lbImages = GALLERY_IMAGES;

  galleryGrid.innerHTML = '';
  GALLERY_IMAGES.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const el = document.createElement('img');
    el.src         = img.src;
    el.alt         = img.caption;
    el.className   = 'gallery-img';
    el.loading     = 'lazy';

    div.appendChild(el);
    div.addEventListener('click', () => openLightbox(i));
    galleryGrid.appendChild(div);
  });
}

function openLightbox(index) {
  lbIndex = index;
  showLbImage();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  bindLbSwipe();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLbImage() {
  const d = lbImages[lbIndex];
  lbImg.src = d.src;
  lbCaption.textContent = d.caption;
}

function lbGo(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  // Fade transition
  lbImg.style.opacity = '0';
  setTimeout(() => {
    showLbImage();
    lbImg.style.opacity = '1';
  }, 150);
}

function bindLbSwipe() {
  lbImg.addEventListener('touchstart', e => { lbStartX = e.touches[0].clientX; }, { passive: true });
  lbImg.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - lbStartX;
    if (Math.abs(dx) > 40) lbGo(dx < 0 ? 1 : -1);
  });
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => lbGo(-1));
document.getElementById('lbNext').addEventListener('click', () => lbGo(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Transition style
lbImg.style.transition = 'opacity 0.15s ease';

// ============================================================
//  FAQ
// ============================================================
function buildFAQ() {
  faqList.innerHTML = '';
  FAQ_DATA.forEach((faq, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';

    item.innerHTML = `
      <button class="faq-q" onclick="toggleFaq(this)">
        <span>${faq.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">${faq.a}</div>
    `;

    faqList.appendChild(item);
  });
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));

  if (!wasOpen) item.classList.add('open');
}

// ============================================================
//  GEOLOCATION
// ============================================================
function getLocation() {
  const btn    = document.getElementById('locationBtn');
  const status = document.getElementById('locationStatus');
  const addrEl = document.getElementById('ordAddress');

  btn.disabled = true;
  status.textContent = 'Konum alınır...';
  status.className = 'location-status';

  if (!navigator.geolocation) {
    status.textContent = 'Konum dəstəklənmir';
    status.className = 'location-status err';
    btn.disabled = false;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(6);
      const lon = pos.coords.longitude.toFixed(6);

      // Save as Google Maps link
      userLocationLink = `https://maps.google.com/?q=${lat},${lon}`;

      addrEl.value = `Mənim konum: ${lat}, ${lon}`;
      status.textContent = '✓ Konum alındı';
      status.className = 'location-status ok';
      btn.disabled = false;
    },
    err => {
      const msgs = {
        1: 'Konum icazəsi verilmədi',
        2: 'Konum tapılmadı',
        3: 'Vaxt başa çatdı'
      };
      status.textContent = msgs[err.code] || 'Xəta baş verdi';
      status.className = 'location-status err';
      btn.disabled = false;
    },
    { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
  );
}

// ============================================================
//  FORMS
// ============================================================
function bindForms() {
  // Reservation
  document.getElementById('reservationForm').addEventListener('submit', e => {
    e.preventDefault();
    const name   = document.getElementById('resName').value.trim();
    const phone  = document.getElementById('resPhone').value.trim();
    const date   = document.getElementById('resDate').value;
    const time   = document.getElementById('resTime').value;
    const people = document.getElementById('resPeople').value;
    const note   = document.getElementById('resNote').value.trim();

    if (!name || !phone || !date || !time || !people) {
      showToast('Bütün məcburi xanaları doldurun ⚠️');
      return;
    }

    const msg = [
      '📅 *REZERVASİYA SİFARİŞİ*',
      `👤 Ad: ${name}`,
      `📞 Telefon: ${phone}`,
      `📆 Tarix: ${date}`,
      `🕐 Saat: ${time}`,
      `👥 Nəfər sayı: ${people}`,
      note ? `📝 Qeyd: ${note}` : ''
    ].filter(Boolean).join('\n');

    openWhatsApp(RESERVE_WA, msg);
  });

  // Order
  document.getElementById('orderForm').addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('ordName').value.trim();
    const phone   = document.getElementById('ordPhone').value.trim();
    const address = document.getElementById('ordAddress').value.trim();
    const note    = document.getElementById('ordNote').value.trim();

    if (!name || !phone || !address) {
      showToast('Ad, telefon və ünvanı doldurun ⚠️');
      return;
    }

    const entries = Object.values(cart);
    let itemLines = '';

    if (entries.length > 0) {
      itemLines = '\n🛒 *Sifariş:*\n' + entries.map(({ item, qty }) =>
        `• ${item.name} × ${qty}${item.price > 0 ? ' — ' + formatPrice(item.price * qty) : ''}`
      ).join('\n');

      const total = getCartTotal();
      if (total > 0) itemLines += `\n💰 Cəmi: ${formatPrice(total)}`;
    }

    let locationLine = '';
    if (userLocationLink) {
      locationLine = `\n📍 Konum: ${userLocationLink}`;
    }

    const msg = [
      '🛵 *YENİ SİFARİŞ*',
      `👤 Ad: ${name}`,
      `📞 Telefon: ${phone}`,
      `🏠 Ünvan: ${address}`,
      locationLine,
      itemLines,
      note ? `📝 Qeyd: ${note}` : ''
    ].filter(Boolean).join('\n');

    openWhatsApp(ORDER_WA, msg);
  });
}

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('resDate');
  if (dateEl) dateEl.min = today;
}

function openWhatsApp(number, msg) {
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${number}?text=${encoded}`, '_blank');
}

// ============================================================
//  HELPERS
// ============================================================
function findItem(id) {
  for (const cat of MENU_DATA) {
    const found = cat.items.find(i => i.id === id);
    if (found) return found;
  }
  return null;
}

function formatPrice(num) {
  return num.toFixed(2).replace('.', ',') + ' ₼';
}

let toastTimer = null;
function showToast(msg) {
  if (toastTimer) { clearTimeout(toastTimer); toast.className = 'toast'; }
  toast.textContent = msg;
  toast.className = 'toast show';
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 2300);
}
