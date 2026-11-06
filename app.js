'use strict';

const root = document.documentElement;
const dialog = document.getElementById('project-dialog');
const grid = document.getElementById('project-grid');
let language = root.lang === 'vi' ? 'vi' : 'en';
let activeFilter = 'all';
let currentProject = null;
let currentSlide = 0;
let projectOpener = null;
let copyTimer;

const summaries = {
  'food-war': {
    en: 'A culinary card-battling adventure. Join Pep on a journey to restore flavor and color to the world of Gastronomia.',
    vi: 'Cuộc phiêu lưu thẻ bài giữa thế giới ẩm thực. Cùng Pep mang hương vị và sắc màu trở lại với Gastronomia.'
  },
  'commandos-3d': {
    en: 'Take on a robot uprising in a sci-fi action shooter. Break through enemy forces and uncover who controls the machines.',
    vi: 'Đối đầu cuộc nổi dậy của robot trong game bắn súng khoa học viễn tưởng. Vượt phòng tuyến và khám phá kẻ điều khiển cỗ máy.'
  },
  'tap-away-3d': {
    en: 'A new perspective on puzzles. Rotate, think, and tap your way through intricate 3D block structures.',
    vi: 'Góc nhìn mới cho game giải đố. Xoay, suy nghĩ và chạm để tháo gỡ những cấu trúc khối 3D đầy thử thách.'
  },
  'soda-jam': {
    en: 'A colorful sorting challenge. Match drinks to their cartons and find order in a busy conveyor belt.',
    vi: 'Thử thách phân loại đầy màu sắc. Ghép đồ uống vào đúng thùng và tìm trật tự giữa băng chuyền bận rộn.'
  },
  'blackout': {
    en: 'An atmospheric roguelike in a world of eternal twilight. Explore shifting lands and uncover a forgotten civilization.',
    vi: 'Game roguelike trong thế giới hoàng hôn vĩnh cửu. Khám phá vùng đất biến đổi và tìm lại nền văn minh bị lãng quên.'
  }
};

const labels = {
  en: {
    details: 'Explore project', featured: 'IN THE SPOTLIGHT', screenshot: 'Screenshot',
    previous: 'Previous screenshot', next: 'Next screenshot', close: 'Close project',
    trailer: 'Load gameplay video', youtube: 'Open on YouTube', hideVideo: 'Hide gameplay video',
    copy: 'Copy email address', copied: 'Email copied to clipboard.',
    copyError: 'Select and copy the email address above, or click it to send an email.',
    imageError: 'This image could not load. Try another screenshot.',
    categories: { card: 'Card & strategy', action: 'Action & adventure', puzzle: 'Puzzle' }
  },
  vi: {
    details: 'Khám phá dự án', featured: 'DỰ ÁN NỔI BẬT', screenshot: 'Ảnh chụp',
    previous: 'Ảnh trước', next: 'Ảnh tiếp theo', close: 'Đóng dự án',
    trailer: 'Tải video gameplay', youtube: 'Mở trên YouTube', hideVideo: 'Ẩn video gameplay',
    copy: 'Sao chép địa chỉ email', copied: 'Đã sao chép email.',
    copyError: 'Chọn và sao chép địa chỉ phía trên, hoặc nhấn vào email để gửi thư.',
    imageError: 'Không tải được ảnh này. Hãy thử ảnh khác.',
    categories: { card: 'Thẻ bài & chiến thuật', action: 'Hành động & phiêu lưu', puzzle: 'Giải đố' }
  }
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
}

function remember(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* Preferences remain usable without storage. */ }
}

function storeLinks(project) {
  return project.links.map(link => `<a class="store-link" href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)}${icon('up-right')}</a>`).join('');
}

function projectTags(project) {
  return project.tags.map(tag => `<span class="tag">${escapeHTML(tag[language])}</span>`).join('');
}

function renderProjects() {
  const text = labels[language];
  grid.innerHTML = projects.map((project, index) => {
    const portrait = project.category === 'puzzle';
    const cover = portrait
      ? `<img src="${project.images[0]}" alt="${escapeHTML(project.title)} — ${text.screenshot} 1" loading="lazy" width="1080" height="1920"><img src="${project.images[1]}" alt="${escapeHTML(project.title)} — ${text.screenshot} 2" loading="lazy" width="1080" height="1920">`
      : `<img class="cover-image" src="${project.images[0]}" alt="${escapeHTML(project.title)} — ${text.screenshot} 1" loading="lazy" width="1706" height="957">`;
    return `<article class="project-card ${index === 0 ? 'featured-project' : ''}" data-category="${project.category}" data-project="${project.id}">
      <button type="button" class="project-cover ${portrait ? 'portrait-cover' : ''} ${project.id === 'soda-jam' ? 'soda-cover' : ''}" data-open="${project.id}" aria-label="${text.details}: ${escapeHTML(project.title)}">
        ${cover}<span class="cover-badge">${project.year}</span><span class="cover-open">${icon('up-right')}</span>
      </button>
      <div class="project-content">
        ${index === 0 ? `<p class="featured-label"><span class="small-dot"></span>${text.featured}</p>` : ''}
        <p class="project-category">${text.categories[project.category]} <span aria-hidden="true">/</span> ${project.tags.some(tag => tag.en === '2D') ? '2D' : '3D'}</p>
        <h3 class="project-title"><button type="button" class="project-title-button" data-open="${project.id}">${escapeHTML(project.title)}</button></h3>
        <p class="project-summary">${summaries[project.id][language]}</p>
        <div class="project-meta">${projectTags(project)}</div>
        <div class="project-footer"><div class="project-links">${storeLinks(project)}</div><button type="button" class="details-link" data-open="${project.id}" aria-label="${text.details}: ${escapeHTML(project.title)}">${text.details}${icon('arrow')}</button></div>
      </div>
    </article>`;
  }).join('');
  applyFilter(false);
}

function applyFilter(announce = true) {
  let count = 0;
  grid.querySelectorAll('.project-card').forEach(card => {
    card.hidden = activeFilter !== 'all' && card.dataset.category !== activeFilter;
    if (!card.hidden) count++;
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (announce) {
    document.getElementById('filter-status').textContent = language === 'vi' ? `Đang hiển thị ${count} dự án.` : `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
  }
}

function updateThemeButton() {
  const light = root.dataset.theme === 'light';
  const button = document.getElementById('themeBtn');
  button.innerHTML = icon(light ? 'moon' : 'sun');
  button.setAttribute('aria-label', language === 'vi' ? `Chuyển sang giao diện ${light ? 'tối' : 'sáng'}` : `Switch to ${light ? 'dark' : 'light'} theme`);
  document.querySelector('meta[name="theme-color"]').content = light ? '#f6f7f2' : '#111412';
}

function updateLanguage() {
  root.lang = language;
  document.querySelectorAll('[data-en][data-vi]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.title = language === 'vi' ? 'Trần Đức Long — Lập trình viên Unity' : 'Tran Duc Long — Unity Developer';
  document.getElementById('languageLabel').textContent = language.toUpperCase();
  document.getElementById('langBtn').setAttribute('aria-label', language === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
  document.querySelector('.navigation').setAttribute('aria-label', language === 'vi' ? 'Điều hướng chính' : 'Main navigation');
  document.querySelector('.filters').setAttribute('aria-label', language === 'vi' ? 'Lọc dự án' : 'Filter projects');
  document.querySelector('.close-dialog').setAttribute('aria-label', labels[language].close);
  document.getElementById('copyEmail').setAttribute('aria-label', labels[language].copy);
  document.getElementById('copy-status').textContent = '';
  document.querySelector('.contact-arrow').setAttribute('aria-label', language === 'vi' ? 'Gửi email cho Trần Đức Long' : 'Email Tran Duc Long');
  updateThemeButton();
  renderProjects();
}

function renderDialog(project) {
  const text = labels[language];
  const youtubeURL = project.video ? `https://www.youtube.com/watch?v=${new URL(project.video).pathname.split('/').pop()}` : '';
  document.getElementById('dialog-content').innerHTML = `
    <div class="dialog-project-heading"><img class="dialog-icon" src="${project.icon}" alt="" width="58" height="58"><div><h2 id="dialog-title">${escapeHTML(project.title)}</h2><p class="dialog-year">${project.year} · Unity · ${text.categories[project.category]}</p></div></div>
    <p class="dialog-description">${escapeHTML(project.description[language])}</p>
    <div class="dialog-meta"><div class="project-meta">${projectTags(project)}</div><div class="project-links">${storeLinks(project)}</div></div>
    <div class="gallery-stage ${project.category === 'puzzle' ? 'gallery-portrait' : 'gallery-landscape'}" id="gallery-stage" role="group" aria-label="${language === 'vi' ? 'Ảnh dự án' : 'Project screenshots'}"><img id="gallery-image" src="${project.images[0]}" alt="${escapeHTML(project.title)} — ${text.screenshot} 1" width="1920" height="1080"></div>
    <div class="gallery-controls"><span class="gallery-counter" role="status" aria-live="polite">01 / ${String(project.images.length).padStart(2, '0')}</span><div class="gallery-arrows"><button class="icon-button gallery-previous" type="button" aria-label="${text.previous}">${icon('chevron')}</button><button class="icon-button gallery-next" type="button" aria-label="${text.next}">${icon('chevron')}</button></div></div>
    <div class="gallery-thumbnails" role="group" aria-label="${language === 'vi' ? 'Chọn ảnh' : 'Choose screenshot'}">${project.images.map((src, index) => `<button type="button" class="gallery-thumbnail" data-slide="${index}" aria-label="${text.screenshot} ${index + 1}" aria-pressed="${index === 0}"><img src="${src}" alt="" loading="lazy" width="82" height="56"></button>`).join('')}</div>
    ${project.video ? `<div class="trailer-section"><div class="trailer-links"><button type="button" class="button" id="load-trailer" aria-expanded="false" aria-controls="trailer-container">${icon('play')}<span>${text.trailer}</span></button><a class="text-link" href="${youtubeURL}" target="_blank" rel="noopener noreferrer">${text.youtube}${icon('up-right')}</a></div><div id="trailer-container"></div></div>` : ''}`;
  document.getElementById('gallery-image').addEventListener('error', showImageError);
  let touchStart;
  const stage = document.getElementById('gallery-stage');
  stage.addEventListener('touchstart', event => {
    touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showSlide(currentSlide + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
}

function showImageError() {
  if (document.querySelector('.image-error')) return;
  const message = document.createElement('p');
  message.className = 'image-error';
  message.textContent = labels[language].imageError;
  document.getElementById('gallery-stage').append(message);
}

function showSlide(index) {
  if (!currentProject) return;
  currentSlide = (index + currentProject.images.length) % currentProject.images.length;
  const image = document.getElementById('gallery-image');
  document.querySelector('.image-error')?.remove();
  image.src = currentProject.images[currentSlide];
  image.alt = `${currentProject.title} — ${labels[language].screenshot} ${currentSlide + 1}`;
  document.querySelector('.gallery-counter').textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(currentProject.images.length).padStart(2, '0')}`;
  document.querySelectorAll('[data-slide]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.slide) === currentSlide));
  });
  // Scroll only the thumbnail strip, never the dialog or page.
  const selected = document.querySelector(`[data-slide="${currentSlide}"]`);
  const strip = document.querySelector('.gallery-thumbnails');
  if (selected.offsetLeft < strip.scrollLeft || selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
    strip.scrollLeft = selected.offsetLeft - strip.offsetLeft - 8;
  }
}

function syncProjectWithHash() {
  const project = projects.find(item => location.hash === `#project-${item.id}`);
  if (project) {
    if (currentProject?.id === project.id && dialog.open) return;
    currentProject = project;
    currentSlide = 0;
    renderDialog(project);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  } else if (dialog.open) {
    dialog.close();
  }
}

function requestClose() {
  if (history.state?.portfolioProject) {
    history.back();
  } else {
    history.replaceState(null, '', `${location.pathname}${location.search}#projects`);
    dialog.close();
  }
}

grid.addEventListener('click', event => {
  const opener = event.target.closest('[data-open]');
  if (!opener) return;
  projectOpener = opener;
  history.pushState({ portfolioProject: true }, '', `#project-${opener.dataset.open}`);
  syncProjectWithHash();
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => { activeFilter = button.dataset.filter; applyFilter(); });
});

document.getElementById('langBtn').addEventListener('click', () => {
  language = language === 'en' ? 'vi' : 'en';
  remember('portfolio-language', language);
  updateLanguage();
});

document.getElementById('themeBtn').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  remember('portfolio-theme', root.dataset.theme);
  updateThemeButton();
});

document.getElementById('copyEmail').addEventListener('click', async () => {
  const button = document.getElementById('copyEmail');
  const status = document.getElementById('copy-status');
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText('tranduclong09@gmail.com');
    button.innerHTML = icon('check');
    status.textContent = labels[language].copied;
    copyTimer = setTimeout(() => { button.innerHTML = icon('copy'); status.textContent = ''; }, 4000);
  } catch (_) {
    button.innerHTML = icon('copy');
    status.textContent = labels[language].copyError;
  }
});

dialog.addEventListener('click', event => {
  if (event.target.closest('.close-dialog')) return requestClose();
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
    return;
  }
  if (event.target.closest('.gallery-previous')) showSlide(currentSlide - 1);
  if (event.target.closest('.gallery-next')) showSlide(currentSlide + 1);
  const thumbnail = event.target.closest('[data-slide]');
  if (thumbnail) showSlide(Number(thumbnail.dataset.slide));
  const trailer = event.target.closest('#load-trailer');
  if (trailer && currentProject?.video) {
    const container = document.getElementById('trailer-container');
    const expanded = trailer.getAttribute('aria-expanded') === 'true';
    container.replaceChildren();
    if (!expanded) {
      const frame = document.createElement('iframe');
      frame.src = currentProject.video.replace('www.youtube.com', 'www.youtube-nocookie.com');
      frame.title = `${currentProject.title} — Gameplay`;
      frame.className = 'trailer-frame';
      frame.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      container.append(frame);
    }
    trailer.setAttribute('aria-expanded', String(!expanded));
    trailer.querySelector('span').textContent = expanded ? labels[language].trailer : labels[language].hideVideo;
  }
});

dialog.addEventListener('cancel', event => { event.preventDefault(); requestClose(); });
dialog.addEventListener('close', () => {
  document.getElementById('dialog-content').replaceChildren();
  currentProject = null;
  if (projectOpener?.isConnected) projectOpener.focus({ preventScroll: true });
  projectOpener = null;
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])')]
      .filter(element => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
    return;
  }
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(currentSlide + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(currentSlide - 1); }
});
window.addEventListener('hashchange', syncProjectWithHash);
window.addEventListener('popstate', syncProjectWithHash);

const navLinks = [...document.querySelectorAll('.nav-link')];
let scrollFrame;
function updateNavigation() {
  scrollFrame = null;
  let active = '#projects';
  const contact = document.getElementById('contact');
  const about = document.getElementById('about');
  if (about.getBoundingClientRect().top < innerHeight * .4) active = '#about';
  if (contact.getBoundingClientRect().top < innerHeight * .55 || scrollY + innerHeight >= document.documentElement.scrollHeight - 10) active = '#contact';
  navLinks.forEach(link => {
    const selected = link.getAttribute('href') === active;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
}, { passive: true });

document.querySelectorAll('.current-year').forEach(element => { element.textContent = new Date().getFullYear(); });
updateLanguage();
syncProjectWithHash();
updateNavigation();
