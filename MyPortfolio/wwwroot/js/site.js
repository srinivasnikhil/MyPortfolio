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