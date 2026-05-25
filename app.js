/* ============================================================
   FeastHub – Main Application JS (app.js)
   Handles: Loader, Theme, Navbar, Cart, Rendering, Animations
   ============================================================ */

'use strict';

/* ========== 1. DOM Ready ========== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAOS();
  initTheme();
  initNavbar();
  initScrollTop();
  renderCategories();
  renderDishes();
  renderWhyChooseUs();
  renderGallery();
  renderTestimonials();
  renderChefs();
  initFilterTabs();
  initOfferTimer();
  initForms();
  initCart();
  initActiveNavLinks();
});

/* ========== 2. Loader ========== */
function initLoader() {
  const loader = document.getElementById('loader');
  // Simulate minimum display time for brand feel
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1500);
  });
  // Fallback
  setTimeout(() => loader.classList.add('hidden'), 3000);
}

/* ========== 3. AOS Animations ========== */
function initAOS() {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });
}

/* ========== 4. Dark / Light Theme ========== */
function initTheme() {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const stored = localStorage.getItem('fh-theme') || 'light';

  applyTheme(stored);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('fh-theme', next);
  });

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    btn.innerHTML = t === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
}

/* ========== 5. Sticky Navbar ========== */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ========== 6. Scroll-to-Top ========== */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ========== 7. Active Nav Links on scroll ========== */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.navbar-nav .nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ========== 8. Render Categories ========== */
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  FH.categories.forEach((cat, i) => {
    const div = document.createElement('div');
    div.className = 'category-card';
    div.setAttribute('data-filter', cat.filter);
    div.setAttribute('data-aos', 'zoom-in');
    div.setAttribute('data-aos-delay', String(i * 60));
    div.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
    `;
    div.addEventListener('click', () => {
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      div.classList.add('active');
      filterDishes(cat.filter);
      document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
    });
    grid.appendChild(div);
  });
}

/* ========== 9. Render Dishes ========== */
function renderDishes(filter = 'all') {
  const grid = document.getElementById('dishesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = filter === 'all'
    ? FH.dishes
    : FH.dishes.filter(d => d.category === filter);

  if (items.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No dishes found in this category.</p></div>';
    return;
  }

  items.forEach((dish, i) => {
    const stars = renderStars(dish.rating);
    const badge = dish.vegBadge
      ? `<span class="dish-badge veg">Veg</span>`
      : dish.badge === 'sale'
        ? `<span class="dish-badge sale">Sale</span>`
        : `<span class="dish-badge">${dish.badge}</span>`;
    const origPrice = dish.origPrice
      ? `<span class="orig">₹${dish.origPrice}</span>`
      : '';

    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-3';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', String((i % 4) * 80));
    col.innerHTML = `
      <div class="dish-card">
        <div class="dish-img-wrap">
          <img src="${dish.img}" alt="${dish.name}" loading="lazy" />
          ${badge}
          <button class="dish-fav" data-id="${dish.id}" aria-label="Add ${dish.name} to favourites">
            <i class="fas fa-heart"></i>
          </button>
        </div>
        <div class="dish-body">
          <span class="dish-cat">${dish.catLabel}</span>
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-desc">${dish.desc}</p>
          <div class="dish-rating">
            <span class="stars">${stars}</span>
            <span>${dish.rating} (${dish.reviews.toLocaleString()})</span>
          </div>
          <div class="dish-footer">
            <div class="dish-price">₹${dish.price} ${origPrice}</div>
            <button class="btn-add-cart" data-id="${dish.id}" data-name="${dish.name}" data-price="${dish.price}">
              <i class="fas fa-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });

  // Rebind events
  bindCartButtons();
  bindFavButtons();
  // Refresh AOS for new elements
  AOS.refresh();
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-stroke"></i>' : '') +
    '<i class="far fa-star"></i>'.repeat(empty)
  );
}

/* ========== 10. Filter Tabs ========== */
function initFilterTabs() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterDishes(btn.dataset.filter);
    });
  });
}

function filterDishes(filter) {
  renderDishes(filter);
  // Sync filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter || (filter !== 'all' && btn.dataset.filter === filter));
  });
  // If no exact button match, set "all" as active fallback
  const matched = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.dataset.filter === filter);
  if (!matched) {
    document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
  }
}

/* ========== 11. Cart ========== */
function initCart() {
  const stored = localStorage.getItem('fh-cart');
  if (stored) FH.cart = JSON.parse(stored);
  else FH.cart = [];
  updateCartCount();
}

function bindCartButtons() {
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const { id, name, price } = btn.dataset;
      addToCart({ id: parseInt(id), name, price: parseInt(price) });
    });
  });
}

function addToCart(item) {
  const existing = FH.cart.find(c => c.id === item.id);
  if (existing) existing.qty++;
  else FH.cart.push({ ...item, qty: 1 });
  localStorage.setItem('fh-cart', JSON.stringify(FH.cart));
  updateCartCount();
  showToast(`🛒 ${item.name} added to cart!`);
}

function updateCartCount() {
  const total = (FH.cart || []).reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function showToast(msg) {
  const toastEl = document.getElementById('cartToast');
  document.getElementById('toastMsg').textContent = msg;
  const toast = new bootstrap.Toast(toastEl, { delay: 2500 });
  toast.show();
}

/* ========== 12. Favourites ========== */
function bindFavButtons() {
  document.querySelectorAll('.dish-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.replace('far', 'fas');
      } else {
        icon.classList.replace('fas', 'far');
      }
    });
  });
}

/* ========== 13. Why Choose Us ========== */
function renderWhyChooseUs() {
  const grid = document.getElementById('whyGrid');
  if (!grid) return;
  FH.whyItems.forEach((item, i) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-4';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', String((i % 3) * 100));
    col.innerHTML = `
      <div class="why-card">
        <div class="why-icon"><i class="fas ${item.icon}"></i></div>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `;
    grid.appendChild(col);
  });
}

/* ========== 14. Gallery ========== */
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  FH.gallery.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${item.src}" alt="${item.label}" loading="lazy" />
      <div class="gallery-overlay"><span>${item.label}</span></div>
    `;
    grid.appendChild(div);
  });
}

/* ========== 15. Testimonials Slider ========== */
function renderTestimonials() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  if (!track) return;

  let current = 0;
  let perView = getPerView();
  let total   = FH.testimonials.length;
  let maxIdx  = Math.max(0, total - perView);
  let autoInterval;

  // Build cards
  FH.testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML = `
      <div class="testi-quote">"</div>
      <p class="testi-text">${t.text}</p>
      <div class="testi-stars">${'<i class="fas fa-star"></i>'.repeat(t.stars)}</div>
      <div class="testi-author">
        <img src="${t.avatar}" alt="${t.name}" class="testi-avatar" loading="lazy" />
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  // Build dots
  for (let i = 0; i <= maxIdx; i++) {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dots.appendChild(dot);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth = track.querySelector('.testi-card')?.offsetWidth + 24 || 0;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function getPerView() {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  document.getElementById('testiPrev')?.addEventListener('click', () => { clearAutoplay(); goTo(current - 1); startAutoplay(); });
  document.getElementById('testiNext')?.addEventListener('click', () => { clearAutoplay(); goTo(current < maxIdx ? current + 1 : 0); startAutoplay(); });

  function startAutoplay() { autoInterval = setInterval(() => goTo(current < maxIdx ? current + 1 : 0), 4000); }
  function clearAutoplay() { clearInterval(autoInterval); }
  startAutoplay();

  window.addEventListener('resize', () => {
    const newPer = getPerView();
    if (newPer !== perView) {
      perView = newPer;
      maxIdx = Math.max(0, total - perView);
      goTo(0);
    }
  });
}

/* ========== 16. Chefs ========== */
function renderChefs() {
  const grid = document.getElementById('chefsGrid');
  if (!grid) return;
  FH.chefs.forEach((chef, i) => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-3';
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', String(i * 80));
    col.innerHTML = `
      <div class="chef-card">
        <div class="chef-img-wrap">
          <img src="${chef.img}" alt="${chef.name}" loading="lazy" />
          <div class="chef-social">
            <a href="#" aria-label="${chef.name} on Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="${chef.name} on Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="${chef.name} on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="chef-body">
          <div class="chef-name">${chef.name}</div>
          <div class="chef-role">${chef.role}</div>
          <div class="chef-exp">${chef.exp}</div>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

/* ========== 17. Offer Countdown Timer ========== */
function initOfferTimer() {
  const ohEl = document.getElementById('oh');
  const omEl = document.getElementById('om');
  const osEl = document.getElementById('os');
  if (!ohEl) return;

  // Next Sunday midnight
  function getEndTime() {
    const now = new Date();
    const day = now.getDay();
    const daysUntilSun = (7 - day) % 7 || 7;
    const end = new Date(now);
    end.setDate(now.getDate() + daysUntilSun);
    end.setHours(23, 59, 59, 0);
    return end;
  }

  const endTime = getEndTime();

  function tick() {
    const diff = endTime - Date.now();
    if (diff <= 0) { ohEl.textContent = omEl.textContent = osEl.textContent = '00'; return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    ohEl.textContent = String(h).padStart(2, '0');
    omEl.textContent = String(m).padStart(2, '0');
    osEl.textContent = String(s).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* ========== 18. Form Validation ========== */
function initForms() {
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      showToast('✅ Message sent! We'll reply within 24 hours.');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (!input.validity.valid) {
        input.style.borderColor = '#e74c3c';
        return;
      }
      input.style.borderColor = '';
      showToast('🎉 Subscribed! Check your inbox for your 15% off code.');
      newsletterForm.reset();
    });
  }
}

/* ========== 19. Cart Initialisation ========== */
FH.cart = [];