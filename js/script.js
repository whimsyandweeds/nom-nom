// Nom Nom Pet Pantry - Script

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const bgVideo = document.getElementById('bgVideo');
  const videoSource = document.getElementById('videoSource');

  // Switch video based on viewport
  function setVideo() {
    const isMobile = window.innerWidth <= 768;
    const desired = isMobile
      ? 'assets/videos/mobile-bg.mp4'
      : 'assets/videos/desktop-bg.mp4';
    if (!videoSource.getAttribute('src') || !videoSource.src.endsWith(desired.split('/').pop())) {
      videoSource.src = desired;
      bgVideo.load();
      bgVideo.play().catch(() => {});
    }
  }

  setVideo();
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(setVideo, 150);
  });

  // Hide loader after short time (or when video can play)
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);

  bgVideo.addEventListener('canplay', () => {
    loader.classList.add('hidden');
  }, { once: true });

  // Paw prints - even number, 1:1 fade
  const pawsContainer = document.getElementById('paws');
  const pawCount = 8; // even
  const positions = [
    { top: '12%', left: '8%' },
    { top: '18%', right: '10%' },
    { top: '35%', left: '5%' },
    { top: '42%', right: '7%' },
    { top: '60%', left: '12%' },
    { top: '68%', right: '15%' },
    { top: '82%', left: '6%' },
    { top: '88%', right: '9%' },
  ];

  for (let i = 0; i < pawCount; i++) {
    const paw = document.createElement('div');
    paw.className = 'paw';
    paw.textContent = '🐾';
    const pos = positions[i];
    Object.assign(paw.style, pos);
    paw.style.animationDelay = `${i * 0.4}s`;
    paw.style.animationDuration = `${2.2 + (i % 3) * 0.3}s`;
    pawsContainer.appendChild(paw);
  }

  // Lightbox for donation photos
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryImgs = document.querySelectorAll('.gallery-scroll img');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.dataset.full || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Ensure external links open correctly (already target=_blank)
  // Smooth scroll is handled by CSS
});
