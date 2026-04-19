import './styles.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  init3DButtons()
  initSmoothScroll()
  initCardHoverEffects()
  initNavigation()
  initEnhanced3DEffects()
  initScrollProgress()
  initCTAButtons()
  initSectionLinks()
  initCertificateModal()
  initCursorGlow()
  initTypewriter()
  initActiveNavHighlight()
  initNavScrolled()
  initNeuralHero()
  initGSAPAnimations()
})

// ─── THREE.JS NEURAL HERO ──────────────────────────────────────────────────────
async function initNeuralHero() {
  const hero = document.querySelector('.landing-section')
  if (!hero) return

  const THREE = await import('three')
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;'
  hero.appendChild(canvas)

  let W = hero.offsetWidth
  let H = hero.offsetHeight

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(W, H)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, W / H, 1, 1000)
  camera.position.z = 400

  const N = 65
  const CONNECT = 120

  const nodes = Array.from({ length: N }, () => ({
    x: (Math.random() - 0.5) * 750,
    y: (Math.random() - 0.5) * 520,
    z: (Math.random() - 0.5) * 180,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    vz: (Math.random() - 0.5) * 0.07,
  }))

  // Points
  const ptPos = new Float32Array(N * 3)
  const ptAttr = new THREE.BufferAttribute(ptPos, 3)
  ptAttr.setUsage(THREE.DynamicDrawUsage)
  const ptGeo = new THREE.BufferGeometry()
  ptGeo.setAttribute('position', ptAttr)
  scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
    color: 0x5da9e9, size: 2.4, transparent: true, opacity: 0.5, sizeAttenuation: true,
  })))

  // Lines — pre-allocated single LineSegments for perf
  const MAX_SEGS = N * (N - 1) / 2
  const linePos = new Float32Array(MAX_SEGS * 6)
  const lineAttr = new THREE.BufferAttribute(linePos, 3)
  lineAttr.setUsage(THREE.DynamicDrawUsage)
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', lineAttr)
  lineGeo.setDrawRange(0, 0)
  scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0x5da9e9, transparent: true, opacity: 0.09,
  })))

  let mouseX = 0, mouseY = 0
  window.addEventListener('mousemove', e => {
    mouseX =  (e.clientX / window.innerWidth  - 0.5) * 45
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 28
  }, { passive: true })

  let rafId
  function animate() {
    rafId = requestAnimationFrame(animate)
    let li = 0
    for (let i = 0; i < N; i++) {
      const n = nodes[i]
      n.x += n.vx; n.y += n.vy; n.z += n.vz
      if (Math.abs(n.x) > 375) n.vx *= -1
      if (Math.abs(n.y) > 260) n.vy *= -1
      if (Math.abs(n.z) > 90)  n.vz *= -1
      ptPos[i * 3] = n.x; ptPos[i * 3 + 1] = n.y; ptPos[i * 3 + 2] = n.z

      for (let j = i + 1; j < N; j++) {
        const dx = n.x - nodes[j].x
        const dy = n.y - nodes[j].y
        if (dx * dx + dy * dy < CONNECT * CONNECT) {
          linePos[li++] = n.x;        linePos[li++] = n.y;        linePos[li++] = n.z
          linePos[li++] = nodes[j].x; linePos[li++] = nodes[j].y; linePos[li++] = nodes[j].z
        }
      }
    }
    ptAttr.needsUpdate = true
    lineAttr.needsUpdate = true
    lineGeo.setDrawRange(0, li / 3)

    camera.position.x += (mouseX - camera.position.x) * 0.04
    camera.position.y += (mouseY - camera.position.y) * 0.04
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
  }

  // Only run while hero is visible
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!rafId) animate() }
    else { cancelAnimationFrame(rafId); rafId = null }
  }, { threshold: 0 })
  obs.observe(hero)
  animate()

  window.addEventListener('resize', () => {
    W = hero.offsetWidth; H = hero.offsetHeight
    renderer.setSize(W, H)
    camera.aspect = W / H
    camera.updateProjectionMatrix()
  }, { passive: true })
}

// ─── GSAP ANIMATIONS ──────────────────────────────────────────────────────────
function initGSAPAnimations() {
  // Hero entrance — staggered, no scroll trigger
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-status-line',  { opacity: 0, y: 18, duration: 0.7 }, 0.5)
    .from('.hero-degree-tag',   { opacity: 0, y: 18, duration: 0.7 }, 0.65)
    .from('.minimalist-name',   { opacity: 0, y: 52, duration: 1.1  }, 0.8)
    .from('.hero-role-text',    { opacity: 0, y: 22, duration: 0.8  }, 1.15)
    .from('.hero-stat-pill',    { opacity: 0, y: 14, duration: 0.5, stagger: 0.09 }, 1.35)
    .from('.hero-cta-row > *',  { opacity: 0, y: 18, duration: 0.6, stagger: 0.11 }, 1.55)
    .from('.scroll-arrow-indicator', { opacity: 0, duration: 0.8 }, 1.85)

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0, y: 32, duration: 0.85, ease: 'power3.out',
    })
  })

  // About
  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-me-section', start: 'top 78%' },
    opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
  })
  gsap.from('.cta-buttons', {
    scrollTrigger: { trigger: '.about-me-section', start: 'top 70%' },
    opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.15,
  })

  // Skills — stagger cards
  gsap.from('.skill-card', {
    scrollTrigger: { trigger: '.skills-section', start: 'top 78%' },
    opacity: 0, y: 44, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  })

  // Projects — stagger cards
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-section', start: 'top 78%' },
    opacity: 0, y: 48, duration: 0.75, stagger: 0.13, ease: 'power3.out',
  })

  // Hackathons — featured then compact
  gsap.from('.hackathon-featured .timeline-card', {
    scrollTrigger: { trigger: '.hackathon-section', start: 'top 78%' },
    opacity: 0, y: 44, duration: 0.75, stagger: 0.15, ease: 'power3.out',
  })
  gsap.from('.hackathon-rest-label', {
    scrollTrigger: { trigger: '.hackathon-compact-grid', start: 'top 90%' },
    opacity: 0, duration: 0.6, ease: 'power2.out',
  })
  gsap.from('.hackathon-compact-item', {
    scrollTrigger: { trigger: '.hackathon-compact-grid', start: 'top 88%' },
    opacity: 0, x: -24, duration: 0.6, stagger: 0.1, ease: 'power3.out',
  })

  // Experience
  gsap.from('.experience-card', {
    scrollTrigger: { trigger: '.experience-section', start: 'top 78%' },
    opacity: 0, y: 44, duration: 0.75, stagger: 0.15, ease: 'power3.out',
  })

  // Education
  gsap.from('.education-card', {
    scrollTrigger: { trigger: '.education-section', start: 'top 78%' },
    opacity: 0, y: 40, duration: 0.75, stagger: 0.12, ease: 'power3.out',
  })
  gsap.from('.recognition-banner', {
    scrollTrigger: { trigger: '.recognition-banner', start: 'top 88%' },
    opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
  })

  // Contact
  gsap.from('.contact-subtitle, .contact-info, .social-buttons', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 80%' },
    opacity: 0, y: 28, duration: 0.7, stagger: 0.13, ease: 'power3.out',
  })
}

// ─── 3D BUTTON TILT ────────────────────────────────────────────────────────────
function init3DButtons() {
  document.querySelectorAll('.btn-3d').forEach(button => {
    let ticking = false
    button.addEventListener('mousemove', e => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const r = button.getBoundingClientRect()
        const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -12
        const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  12
        button.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
        ticking = false
      })
    })
    button.addEventListener('mouseleave', () => { button.style.transform = '' })
    button.addEventListener('click', function () {
      this.style.transform = 'perspective(800px) scale(0.96)'
      setTimeout(() => { this.style.transform = '' }, 140)
    })
  })
}

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function initCursorGlow() {
  if (document.querySelector('.cursor-dot')) return
  const dot  = document.createElement('div'); dot.className  = 'cursor-dot'
  const ring = document.createElement('div'); ring.className = 'cursor-ring'
  document.body.append(dot, ring)

  let rx = -100, ry = -100, mx = -100, my = -100
  const lerp = (a, b, t) => a + (b - a) * t

  const tick = () => {
    rx = lerp(rx, mx, 0.1); ry = lerp(ry, my, 0.1)
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
    requestAnimationFrame(tick)
  }
  window.addEventListener('mousemove', e => {
    mx = e.clientX + window.scrollX; my = e.clientY + window.scrollY
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
  }, { passive: true })
  tick()

  document.addEventListener('mouseover', e => {
    ring.classList.toggle('expanded', !!e.target.closest('a,button,.clickable-card,.btn-3d,[role="button"],label'))
  })
}

// ─── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault()
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

// ─── NAV BUTTON SCROLL ────────────────────────────────────────────────────────
function initNavigation() {
  const sectionMap = {
    skills: '.skills-section', projects: '.projects-section',
    hackathons: '.hackathon-section', experience: '.experience-section',
    contact: '.contact-section', about: '.hero-section',
  }
  document.querySelectorAll('.btn-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.querySelector('.btn-face-front')?.textContent.toLowerCase()
      document.querySelector(sectionMap[key])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

// ─── PROJECT CARD 3D TILT ─────────────────────────────────────────────────────
function initCardHoverEffects() {
  document.querySelectorAll('.project-card').forEach(card => {
    let ticking = false
    card.addEventListener('mousemove', e => {
      if (ticking) return; ticking = true
      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect()
        const cx = r.width / 2, cy = r.height / 2
        card.style.transform = `perspective(1400px) rotateX(${((e.clientY-r.top-cy)/cy)*-7}deg) rotateY(${((e.clientX-r.left-cx)/cx)*7}deg) translateZ(16px)`
        const g = card.querySelector('.card-glow')
        if (g) g.style.background = `radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px,var(--primary) 0%,transparent 60%)`
        ticking = false
      })
    }, { passive: true })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

// ─── SKILL CARD 3D TILT ───────────────────────────────────────────────────────
function initEnhanced3DEffects() {
  document.querySelectorAll('.skill-card').forEach(card => {
    let ticking = false
    card.addEventListener('mousemove', e => {
      if (ticking) return; ticking = true
      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect()
        const rx = ((e.clientY - r.top  - r.height/2) / (r.height/2)) * 7
        const ry = ((e.clientX - r.left - r.width /2) / (r.width /2)) * 7
        card.style.transform = `perspective(1400px) rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(16px)`
        ticking = false
      })
    }, { passive: true })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

// ─── SCROLL PROGRESS BAR ──────────────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress')
  if (!bar) return
  let ticking = false
  window.addEventListener('scroll', () => {
    if (ticking) return; ticking = true
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      bar.style.width = (window.scrollY / max * 100) + '%'
      ticking = false
    })
  }, { passive: true })
}

// ─── CTA / DATA-TARGET BUTTONS ────────────────────────────────────────────────
function initCTAButtons() {
  const map = {
    projects: '.projects-section', contact: '.contact-section',
    hackathons: '.hackathon-section', skills: '.skills-section',
    experience: '.experience-section', about: '.about-me-section',
  }
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      const el = document.querySelector(map[btn.dataset.target] || `#${btn.dataset.target}`)
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    })
  })
}

// ─── CONTACT BUTTONS ──────────────────────────────────────────────────────────
function initSectionLinks() {
  const actions = {
    email:    () => { window.location.href = 'mailto:garv16sep@gmail.com' },
    linkedin: () => { window.open('https://linkedin.com/in/garv12bansal', '_blank') },
    github:   () => { window.open('https://github.com/black1plague2', '_blank') },
  }
  document.querySelectorAll('.btn-contact[data-action]').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); actions[btn.dataset.action]?.() })
  })
}

// ─── GALLERY MODAL ────────────────────────────────────────────────────────────
function initCertificateModal() {
  const modal        = document.getElementById('certificateModal')
  const modalTitle   = document.getElementById('modal-title')
  const modalCounter = document.getElementById('galleryCounter')
  const modalClose   = modal?.querySelector('.modal-close')
  const modalOverlay = modal?.querySelector('.modal-overlay')
  const strip        = document.getElementById('galleryStrip')
  const dotsWrap     = document.getElementById('galleryDots')
  const prevBtn      = modal?.querySelector('.gallery-nav.prev')
  const nextBtn      = modal?.querySelector('.gallery-nav.next')
  if (!modal || !strip || !dotsWrap || !prevBtn || !nextBtn) return

  const galleries = {
    sprintathon: { title: "Sprintathon '25 — Gallery",            images: ['/certificates/sprintathon-1.jpeg','/certificates/sprintathon-2.jpeg'] },
    hackulus:    { title: 'Hackulus / GraVITas 2025 — Gallery',    images: ['/certificates/hackulus-1.jpg','/certificates/hackulus-2.jpg'] },
    innovact:    { title: "InnovAct '25 — Gallery",                images: ['/certificates/innovact-1.jpeg','/certificates/innovact-2.jpeg','/certificates/innovact-3.jpeg'] },
    yantra:      { title: 'Yantra Hackathon 2023 — Gallery',       images: ['/certificates/yantra-1.jpeg','/certificates/yantra-2.jpeg'] },
    cardano:     { title: 'Cardano Asia Hackathon 2025 — Gallery', images: ['/certificates/cardano-1.jpg','/certificates/cardano-2.jpg','/certificates/cardano-3.jpg'] },
    iinventiv:   { title: 'IInventiv 2025 — Gallery',             images: ['/certificates/iinventiv-1.jpg'] },
    innohack:    { title: 'InnoHack 2025 — Gallery',              images: ['/certificates/innohack-1.jpg','/certificates/innohack-2.jpg'] },
  }

  let currentImages = [], currentIdx = 0, scrollTimer = null, slideWidth = 0

  function buildStrip(images) {
    strip.innerHTML = ''
    if (!images.length) { strip.innerHTML = '<div class="gallery-slide"><p style="color:rgba(255,255,255,0.4);padding:2rem;text-align:center;">📷 Images coming soon</p></div>'; return }
    images.forEach((src, i) => {
      const slide = document.createElement('div'); slide.className = 'gallery-slide'
      const img = document.createElement('img')
      img.alt = `Image ${i+1}`; img.loading = i === 0 ? 'eager' : 'lazy'; img.decoding = 'async'
      img.onload = () => img.classList.add('img-loaded')
      img.onerror = () => { slide.style.display = 'none' }
      img.src = src; slide.appendChild(img); strip.appendChild(slide)
    })
  }

  function buildDots(count) {
    dotsWrap.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button'); btn.className = 'gallery-dot'
      btn.setAttribute('aria-label', `Go to image ${i+1}`)
      btn.addEventListener('click', () => scrollToIdx(i))
      dotsWrap.appendChild(btn)
    }
  }

  function updateUI(idx) {
    currentIdx = idx
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === idx))
    prevBtn.disabled = idx === 0
    nextBtn.disabled = idx === currentImages.length - 1 || !currentImages.length
    if (modalCounter) modalCounter.textContent = currentImages.length > 1 ? `${idx+1} / ${currentImages.length}` : ''
  }

  function scrollToIdx(idx) {
    if (!currentImages.length) return
    idx = Math.max(0, Math.min(idx, currentImages.length - 1))
    if (!slideWidth || Math.abs(slideWidth - strip.offsetWidth) > 4) slideWidth = strip.offsetWidth
    strip.scrollTo({ left: idx * slideWidth, behavior: 'smooth' })
    updateUI(idx)
  }

  strip.addEventListener('scrollend', () => {
    if (!slideWidth) slideWidth = strip.offsetWidth
    const idx = Math.round(strip.scrollLeft / (slideWidth || 1))
    if (idx !== currentIdx) updateUI(idx)
  }, { passive: true })
  strip.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      if (!slideWidth) slideWidth = strip.offsetWidth
      const idx = Math.round(strip.scrollLeft / (slideWidth || 1))
      if (idx !== currentIdx) updateUI(idx)
    }, 80)
  }, { passive: true })

  let dragStart = null, isDragging = false
  strip.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; dragStart = e.clientX; isDragging = false; strip.setPointerCapture(e.pointerId); strip.classList.add('dragging') }, { passive: true })
  strip.addEventListener('pointermove', e => { if (dragStart === null) return; if (Math.abs(e.clientX - dragStart) > 5) isDragging = true }, { passive: true })
  strip.addEventListener('pointerup', e => {
    if (dragStart === null) return
    const diff = e.clientX - dragStart; strip.classList.remove('dragging'); dragStart = null
    if (!isDragging) return
    if (diff < -50) scrollToIdx(currentIdx + 1); else if (diff > 50) scrollToIdx(currentIdx - 1)
  }, { passive: true })
  strip.addEventListener('pointercancel', () => { dragStart = null; isDragging = false; strip.classList.remove('dragging') }, { passive: true })

  function openModal(id) {
    const data = galleries[id]; if (!data) return
    currentImages = data.images; currentIdx = 0; slideWidth = 0
    modalTitle.textContent = data.title
    buildStrip(data.images); buildDots(data.images.length)
    strip.scrollLeft = 0
    modal.classList.remove('closing'); modal.classList.add('active')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('modal-open'); document.documentElement.classList.add('modal-open')
    requestAnimationFrame(() => { slideWidth = strip.offsetWidth; updateUI(0); if (modalClose) setTimeout(() => modalClose.focus(), 60) })
  }

  function closeModal() {
    clearTimeout(scrollTimer); modal.classList.add('closing')
    setTimeout(() => {
      modal.classList.remove('active','closing'); modal.setAttribute('aria-hidden','true')
      document.body.classList.remove('modal-open'); document.documentElement.classList.remove('modal-open')
      strip.innerHTML = ''; dotsWrap.innerHTML = ''; currentImages = []
      if (modalCounter) modalCounter.textContent = ''
    }, 220)
  }

  document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', e => { if (e.target.closest('a,button')) return; if (card.dataset.hackathon) openModal(card.dataset.hackathon) })
  })
  document.querySelectorAll('.view-certificates').forEach(el => {
    el.addEventListener('click', e => { e.stopPropagation(); const card = el.closest('.clickable-card'); if (card?.dataset.hackathon) openModal(card.dataset.hackathon) })
  })
  if (modalClose)   modalClose.addEventListener('click', closeModal)
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal)
  prevBtn.addEventListener('click', () => scrollToIdx(currentIdx - 1))
  nextBtn.addEventListener('click', () => scrollToIdx(currentIdx + 1))
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return
    if (e.key === 'Escape')     closeModal()
    if (e.key === 'ArrowLeft')  scrollToIdx(currentIdx - 1)
    if (e.key === 'ArrowRight') scrollToIdx(currentIdx + 1)
  })
  window.addEventListener('resize', () => { if (modal.classList.contains('active')) { slideWidth = strip.offsetWidth; strip.scrollLeft = currentIdx * slideWidth } }, { passive: true })
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function initTypewriter() {
  const el = document.querySelector('.typewriter-text'); if (!el) return
  const roles = ['XR Developer','AR / VR Engineer','Full-Stack Developer','AI Innovator','Unity Specialist','BCI Researcher']
  let ri = 0, ci = 0, deleting = false
  function tick() {
    const cur = roles[ri]
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci)
      if (ci === cur.length) { deleting = true; setTimeout(tick, 1800); return }
    } else {
      el.textContent = cur.slice(0, --ci)
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 300); return }
    }
    setTimeout(tick, deleting ? 45 : 85)
  }
  setTimeout(tick, 1400)
}

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────────────────────
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link'); if (!navLinks.length) return
  const sections = ['about','skills','projects','hackathons','experience','education','contact']
    .map(id => document.getElementById(id)).filter(Boolean)
  function update() {
    const scrollY = window.scrollY + window.innerHeight * 0.35
    let active = null
    for (const s of sections) { if (scrollY >= s.offsetTop) active = s.id }
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${active}`))
  }
  window.addEventListener('scroll', update, { passive: true }); update()
}

// ─── NAV SHRINK ───────────────────────────────────────────────────────────────
function initNavScrolled() {
  const nav = document.querySelector('.nav-bar'); if (!nav) return
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50)
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
}

// ─── SECTION BORDER GLOW ─────────────────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting))
}, { threshold: 0.15 })
document.querySelectorAll('section').forEach(s => obs.observe(s))
