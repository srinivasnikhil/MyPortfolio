// Sidebar active on scroll
const sections = document.querySelectorAll('section.content-section');
const navLinks = document.querySelectorAll('.side-nav a');

function onScroll() {
    let pos = window.scrollY + 120;
    sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(a => a.classList.remove('active'));
            const link = document.querySelector('.side-nav a[href="#' + sec.id + '"]');
            if (link) link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', onScroll);
onScroll();

// Fade reveal and underline
function reveal() {
    document.querySelectorAll('.fade-slide').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 100) el.classList.add('in');
    });
    document.querySelectorAll('.section-title').forEach(h => {
        const r = h.getBoundingClientRect();
        if (r.top < window.innerHeight - 80) h.classList.add('in');
    });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Portfolio filter
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio-grid .item');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        items.forEach(it => {
            it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
        });
    });
});

// Enlarge portfolio image on click
document.querySelectorAll('.project-img').forEach(item => {
    item.addEventListener('click', event => {
        const imgSrc = item.getAttribute('data-img-src');
        document.getElementById('modal-img').src = imgSrc;
    });
});

const modalImg = document.getElementById("modal-img");
let scale = 1;
let posX = 0, posY = 0;
let dragging = false, startX, startY;

modalImg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomAmount = 0.1;
    scale += (e.deltaY < 0 ? zoomAmount : -zoomAmount);
    scale = Math.min(Math.max(1, scale), 4); // Limit zoom between x1 and x4
    modalImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
});

// Drag to move
modalImg.addEventListener("mousedown", (e) => {
    if (scale === 1) return; // No drag unless zoomed
    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    modalImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
});

window.addEventListener("mouseup", () => dragging = false);

const modalEl = document.getElementById('imgModal');
modalEl.addEventListener('hidden.bs.modal', () => {
    scale = 1;
    posX = 0;
    posY = 0;
    modalImg.style.transform = "none";
});

// Detect touch device (mobile, tablet, touchscreen laptop)
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    const img = document.getElementById("modal-img");
    let scale = 1, posX = 0, posY = 0, initialX, initialY, dragging = false;

    img.style.touchAction = "none"; // Prevent default browser zoom

    // Pinch-to-zoom event
    img.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            scale = Math.min(Math.max(1, dist / 150), 4); // Limit zoom between 1x and 4x
            img.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
        }
    });

    // Drag to move image when zoomed in
    img.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1 && scale > 1) {
            dragging = true;
            initialX = e.touches[0].clientX - posX;
            initialY = e.touches[0].clientY - posY;
        }
    });

    img.addEventListener("touchmove", (e) => {
        if (dragging && e.touches.length === 1) {
            posX = e.touches[0].clientX - initialX;
            posY = e.touches[0].clientY - initialY;
            img.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
        }
    });

    img.addEventListener("touchend", () => dragging = false);

    // Reset zoom on modal close
    const modalEl = document.getElementById('imgModal');
    modalEl.addEventListener('hidden.bs.modal', () => {
        scale = 1;
        posX = posY = 0;
        img.style.transform = "none";
    });
}

(function () {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const closeBtn = document.getElementById('drawerClose');
    const backdrop = document.getElementById('drawerBackdrop');

    if (!hamburger || !drawer || !backdrop) return;

    const openDrawer = () => {
        document.body.classList.add('drawer-open');
        drawer.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        backdrop.hidden = false;
    };

    const closeDrawer = () => {
        document.body.classList.remove('drawer-open');
        drawer.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        backdrop.hidden = true;
    };

    hamburger.addEventListener('click', openDrawer);
    backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close when a nav link is clicked
    drawer.addEventListener('click', (e) => {
        const link = e.target.closest('.drawer-link');
        if (link) closeDrawer();
    });

    // ESC key closes drawer
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) {
            closeDrawer();
        }
    });

    // Close drawer if viewport becomes desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeDrawer();
    });
})();
