// ========================================
// AR/VR PORTFOLIO - INTERACTIVE 3D EFFECTS
// ========================================
import './styles.css'

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
  init3DButtons()
  initParallaxEffect()
  initSmoothScroll()
  initCardHoverEffects()
  initNavigation()
  initScrollReveal()
  initEnhanced3DEffects()
  initScrollProgress()
  initCTAButtons()
  initSectionLinks()
  initCertificateModal()
  initCursorGlow()
  init3DParticles()
  init3DShapesInteraction()
  initTypewriter()
  initActiveNavHighlight()
  initNavScrolled()

  console.log(
    '%c🚀 GARV BANSAL | XR Developer Portfolio',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #5da9e9, #ffd700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
  )
  console.log(
    '%cBuilt with immersive 3D effects & smooth transitions',
    'font-size: 14px; color: #5da9e9;'
  )
})

// Enhanced 3D button interactions with mouse tracking - Optimized
function init3DButtons() {
  const buttons = document.querySelectorAll('.btn-3d')

  buttons.forEach((button) => {
    let ticking = false

    button.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = ((y - centerY) / centerY) * -15
          const rotateY = ((x - centerX) / centerX) * 15

          button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`

          ticking = false
        })

        ticking = true
      }
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = ''
    })

    button.addEventListener('click', function () {
      this.style.transform = 'perspective(1000px) scale(0.95)'
      setTimeout(() => {
        this.style.transform = ''
      }, 150)
    })
  })
}

// Sharp two-layer cursor: instant dot + smooth trailing ring
function initCursorGlow() {
  if (document.querySelector('.cursor-dot')) return

  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  const ring = document.createElement('div')
  ring.className = 'cursor-ring'
  document.body.append(dot, ring)

  // Absolute target (accounts for scroll, since body has transform: translateZ(0)
  // which breaks position:fixed — we use position:absolute + scroll offset instead)
  let rx = -100, ry = -100
  let mx = -100, my = -100
  const lerp = (a, b, t) => a + (b - a) * t

  const tick = () => {
    rx = lerp(rx, mx, 0.1)
    ry = lerp(ry, my, 0.1)
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
    requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX + window.scrollX
    my = e.clientY + window.scrollY
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
  }, { passive: true })

  tick()

  // Expand ring on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .clickable-card, .btn-3d, [role="button"], label')) {
      ring.classList.add('expanded')
    } else {
      ring.classList.remove('expanded')
    }
  })
}

// Parallax effect for floating orbs - Optimized with throttling
function initParallaxEffect() {
  const orbs = document.querySelectorAll('.floating-orb')
  let ticking = false

  document.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight

        orbs.forEach((orb, index) => {
          const speed = (index + 1) * 15
          const x = mouseX * speed
          const y = mouseY * speed

          orb.style.transform = `translate3d(${x}px, ${y}px, 0)`
        })

        ticking = false
      })

      ticking = true
    }
  })
}

// Smooth scroll navigation
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}

// Navigation button functionality
function initNavigation() {
  const navButtons = document.querySelectorAll('.btn-nav')

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonText = button
        .querySelector('.btn-face-front')
        .textContent.toLowerCase()

      const sectionMap = {
        skills: '.skills-section',
        projects: '.projects-section',
        hackathons: '.hackathon-section',
        experience: '.experience-section',
        contact: '.contact-section',
        about: '.hero-section',
      }

      const section = document.querySelector(sectionMap[buttonText])
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  })

  // CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-buttons .btn-3d')
  ctaButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonText = button
        .querySelector('.btn-face-front')
        .textContent.toLowerCase()
      if (buttonText.includes('project')) {
        document.querySelector('.projects-section').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } else if (buttonText.includes('contact')) {
        document.querySelector('.contact-section').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  })
}

// Card hover with RAF-throttled 3D tilt
function initCardHoverEffects() {
  document.querySelectorAll('.project-card').forEach((card) => {
    let ticking = false
    card.addEventListener('mousemove', (e) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2, cy = rect.height / 2
        card.style.transform = `perspective(1500px) rotateX(${((y - cy) / cy) * -8}deg) rotateY(${((x - cx) / cx) * 8}deg) translateZ(20px)`
        const glow = card.querySelector('.card-glow')
        if (glow) glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary) 0%, transparent 60%)`
        ticking = false
      })
    }, { passive: true })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

// Initialize Tab Switching
function initTabSwitching() {
  const tabBtns = document.querySelectorAll('.tab-btn')
  const sections = document.querySelectorAll('.content-section')

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab')

      // Remove active class from all tabs and sections
      tabBtns.forEach((b) => b.classList.remove('active'))
      sections.forEach((s) => s.classList.remove('active'))

      // Add active class to clicked tab and corresponding section
      btn.classList.add('active')
      const targetSection = document.querySelector(
        `[data-section="${targetTab}"]`
      )
      if (targetSection) {
        targetSection.classList.add('active')

        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
}

// Scroll Reveal — opacity + translate only (NO visibility:hidden which breaks IntersectionObserver)
function initScrollReveal() {
  const allSections = document.querySelectorAll('section:not(.landing-section)')
  allSections.forEach((s) => {
    s.style.opacity = '0'
    s.style.transform = 'translateY(48px)'
    s.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out'
  })

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        entry.target.classList.add('active')
        sectionObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  allSections.forEach((s) => sectionObserver.observe(s))

  // Card-level fade-in
  const cards = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .experience-card, .education-grid > *'
  )
  cards.forEach((el, i) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    el.style.transition = `opacity 0.55s ease-out ${(i % 6) * 0.07}s, transform 0.55s ease-out ${(i % 6) * 0.07}s`
  })

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        cardObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })

  cards.forEach((el) => cardObserver.observe(el))
}

// Enhanced 3D Effects — skill cards only (project cards handled by initCardHoverEffects)
function initEnhanced3DEffects() {
  document.querySelectorAll('.skill-card').forEach((card) => {
    let ticking = false
    card.addEventListener('mousemove', (e) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const cx = rect.width / 2, cy = rect.height / 2
        const rx = ((e.clientY - rect.top  - cy) / cy) * 8
        const ry = ((e.clientX - rect.left - cx) / cx) * 8
        card.style.transform = `perspective(1500px) rotateX(${-rx}deg) rotateY(${ry}deg) translateZ(20px)`
        ticking = false
      })
    }, { passive: true })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })
}

// Scroll Progress Bar — RAF-throttled
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress')
  if (!progressBar) return
  let ticking = false
  window.addEventListener('scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight
      progressBar.style.width = ((window.scrollY / max) * 100) + '%'
      ticking = false
    })
  }, { passive: true })
}

// Initialize CTA Buttons with Smooth Scroll
function initCTAButtons() {
  const sectionMap = {
    projects:   '.projects-section',
    contact:    '.contact-section',
    hackathons: '.hackathon-section',
    skills:     '.skills-section',
    experience: '.experience-section',
    about:      '.about-me-section',
  }

  // Handle every button / element that declares a data-target
  document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const key = btn.dataset.target
      const selector = sectionMap[key] || `#${key}`
      const section = document.querySelector(selector)
      if (section) {
        const offsetTop = section.offsetTop - 80
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    })
  })
}

// Initialize Section Links (for social buttons)
function initSectionLinks() {
  const actions = {
    email:    () => { window.location.href = 'mailto:garv16sep@gmail.com' },
    linkedin: () => { window.open('https://linkedin.com/in/garv12bansal', '_blank') },
    github:   () => { window.open('https://github.com/black1plague2', '_blank') },
  }

  document.querySelectorAll('.btn-contact[data-action]').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const fn = actions[button.dataset.action]
      if (fn) fn()
    })
  })
}

// Gallery Modal System
function initCertificateModal() {
  const modal        = document.getElementById('certificateModal')
  const modalTitle   = document.getElementById('modal-title')
  const modalCounter = document.getElementById('galleryCounter')
  const modalClose   = modal ? modal.querySelector('.modal-close')   : null
  const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null
  const strip        = document.getElementById('galleryStrip')
  const dotsWrap     = document.getElementById('galleryDots')
  const prevBtn      = modal ? modal.querySelector('.gallery-nav.prev') : null
  const nextBtn      = modal ? modal.querySelector('.gallery-nav.next') : null

  if (!modal || !modalTitle || !strip || !dotsWrap || !prevBtn || !nextBtn) {
    console.warn('Gallery modal: required elements missing.')
    return
  }

  // ── Gallery data ─────────────────────────────────────────────────────────
  const galleries = {
    sprintathon: { title: "Sprintathon '25 — Gallery",            images: ['/certificates/sprintathon-1.jpeg', '/certificates/sprintathon-2.jpeg'] },
    hackulus:    { title: 'Hackulus / GraVITas 2025 — Gallery',    images: ['/certificates/hackulus-1.jpg',    '/certificates/hackulus-2.jpg']    },
    innovact:    { title: "InnovAct '25 — Gallery",                images: ['/certificates/innovact-1.jpeg',   '/certificates/innovact-2.jpeg',  '/certificates/innovact-3.jpeg'] },
    yantra:      { title: 'Yantra Hackathon 2023 — Gallery',       images: ['/certificates/yantra-1.jpeg',     '/certificates/yantra-2.jpeg']     },
    cardano:     { title: 'Cardano Asia Hackathon 2025 — Gallery', images: ['/certificates/cardano-1.jpg', '/certificates/cardano-2.jpg', '/certificates/cardano-3.jpg'] },
    iinventiv:   { title: 'IInventiv 2025 — Gallery',             images: ['/certificates/iinventiv-1.jpg'] },
    innohack:    { title: 'InnoHack 2025 — Gallery',              images: ['/certificates/innohack-1.jpg', '/certificates/innohack-2.jpg'] },
  }

  let currentImages = []
  let currentIdx    = 0
  let scrollTimer   = null
  let slideWidth    = 0  // cached after open to avoid race conditions

  // ── Build slides ──────────────────────────────────────────────────────────
  function buildStrip(images) {
    strip.innerHTML = ''
    if (!images.length) {
      const empty = document.createElement('div')
      empty.className = 'gallery-slide'
      empty.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:0.95rem;text-align:center;padding:2rem;">📷 Images coming soon</p>'
      strip.appendChild(empty)
      return
    }
    images.forEach((src, i) => {
      const slide = document.createElement('div')
      slide.className = 'gallery-slide'
      const img = document.createElement('img')
      img.alt      = `Image ${i + 1} of ${images.length}`
      img.loading  = i === 0 ? 'eager' : 'lazy'
      img.decoding = 'async'
      img.onload  = () => img.classList.add('img-loaded')
      img.onerror = () => { slide.style.display = 'none' }
      img.src = src
      slide.appendChild(img)
      strip.appendChild(slide)
    })
  }

  // ── Dots ──────────────────────────────────────────────────────────────────
  function buildDots(count) {
    dotsWrap.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button')
      btn.className = 'gallery-dot'
      btn.setAttribute('aria-label', `Go to image ${i + 1}`)
      btn.addEventListener('click', () => scrollToIdx(i))
      dotsWrap.appendChild(btn)
    }
  }

  function updateUI(idx) {
    currentIdx = idx
    dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('active', i === idx))
    prevBtn.disabled = idx === 0
    nextBtn.disabled = idx === currentImages.length - 1 || currentImages.length === 0
    if (modalCounter && currentImages.length > 1) {
      modalCounter.textContent = `${idx + 1} / ${currentImages.length}`
    } else if (modalCounter) {
      modalCounter.textContent = ''
    }
  }

  // ── Navigation — uses cached slideWidth to avoid layout thrash ────────────
  function scrollToIdx(idx) {
    if (!currentImages.length) return
    idx = Math.max(0, Math.min(idx, currentImages.length - 1))
    // Re-measure only if width seems stale (e.g. resize)
    if (!slideWidth || Math.abs(slideWidth - strip.offsetWidth) > 4) {
      slideWidth = strip.offsetWidth
    }
    strip.scrollTo({ left: idx * slideWidth, behavior: 'smooth' })
    updateUI(idx)
  }

  // Sync dot/counter when native scroll-snap settles
  strip.addEventListener('scrollend', () => {
    if (!slideWidth) slideWidth = strip.offsetWidth
    const idx = Math.round(strip.scrollLeft / (slideWidth || 1))
    if (idx !== currentIdx) updateUI(idx)
  }, { passive: true })

  // Debounced fallback for browsers without scrollend
  strip.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      if (!slideWidth) slideWidth = strip.offsetWidth
      const idx = Math.round(strip.scrollLeft / (slideWidth || 1))
      if (idx !== currentIdx) updateUI(idx)
    }, 80)
  }, { passive: true })

  // ── Touch / mouse drag swipe ──────────────────────────────────────────────
  let dragStart = null
  let isDragging = false

  strip.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStart = e.clientX
    isDragging = false
    strip.setPointerCapture(e.pointerId)
    strip.classList.add('dragging')
  }, { passive: true })

  strip.addEventListener('pointermove', (e) => {
    if (dragStart === null) return
    if (Math.abs(e.clientX - dragStart) > 5) isDragging = true
  }, { passive: true })

  strip.addEventListener('pointerup', (e) => {
    if (dragStart === null) return
    const diff = e.clientX - dragStart
    strip.classList.remove('dragging')
    dragStart = null
    if (!isDragging) return
    if (diff < -50) scrollToIdx(currentIdx + 1)
    else if (diff > 50) scrollToIdx(currentIdx - 1)
  }, { passive: true })

  strip.addEventListener('pointercancel', () => {
    dragStart = null
    isDragging = false
    strip.classList.remove('dragging')
  }, { passive: true })

  // ── Open / Close ──────────────────────────────────────────────────────────
  function openModal(id) {
    const data = galleries[id]
    if (!data) { console.warn(`Gallery: no entry for "${id}".`); return }
    currentImages = data.images
    currentIdx    = 0
    slideWidth    = 0  // will be measured after layout
    modalTitle.textContent = data.title
    buildStrip(data.images)
    buildDots(data.images.length)
    strip.scrollLeft = 0
    modal.classList.remove('closing')
    modal.classList.add('active')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('modal-open')
    document.documentElement.classList.add('modal-open')
    // Measure after the modal paints so offsetWidth is correct
    requestAnimationFrame(() => {
      slideWidth = strip.offsetWidth
      updateUI(0)
      if (modalClose) setTimeout(() => modalClose.focus(), 60)
    })
  }

  function closeModal() {
    clearTimeout(scrollTimer)
    modal.classList.add('closing')
    setTimeout(() => {
      modal.classList.remove('active', 'closing')
      modal.setAttribute('aria-hidden', 'true')
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
      strip.innerHTML    = ''
      dotsWrap.innerHTML = ''
      currentImages      = []
      if (modalCounter) modalCounter.textContent = ''
    }, 220)
  }

  // ── Wire up triggers ──────────────────────────────────────────────────────
  document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a, button')) return
      const id = card.dataset.hackathon
      if (id) openModal(id)
    })
  })
  document.querySelectorAll('.view-certificates').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation()
      const card = el.closest('.clickable-card')
      if (card?.dataset.hackathon) openModal(card.dataset.hackathon)
    })
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

  // Re-measure on resize so scrollToIdx math stays correct
  window.addEventListener('resize', () => {
    if (modal.classList.contains('active')) {
      slideWidth = strip.offsetWidth
      strip.scrollLeft = currentIdx * slideWidth
    }
  }, { passive: true })
}

// Lightweight particle system — 18 particles, CSS-animated
function init3DParticles() {
  const container = document.querySelector('.floating-3d-shapes')
  if (!container) return
  const colors = ['rgba(93,169,233,0.5)', 'rgba(255,215,0,0.5)', 'rgba(123,107,160,0.5)']
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div')
    p.className = 'particle-3d'
    p.style.cssText = `left:${Math.random()*100}%;animation-delay:${(Math.random()*12).toFixed(1)}s;animation-duration:${(10+Math.random()*8).toFixed(1)}s;background:${colors[i%3]};will-change:transform,opacity`
    container.appendChild(p)
  }
}

// 3D shapes mouse parallax — RAF-throttled
function init3DShapesInteraction() {
  const shapes = document.querySelectorAll('.shape-3d')
  if (!shapes.length) return
  let ticking = false
  document.addEventListener('mousemove', (e) => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const mx = e.clientX / window.innerWidth - 0.5
      const my = e.clientY / window.innerHeight - 0.5
      shapes.forEach((s, i) => {
        const sp = (i + 1) * 18
        s.style.transform = `translate(${mx * sp}px, ${my * sp}px)`
      })
      ticking = false
    })
  }, { passive: true })
}

// Section border glow handled via CSS class toggling (no inline animation thrashing)
function initSectionBorderGlow() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting))
  }, { threshold: 0.15 })
  document.querySelectorAll('section').forEach(s => observer.observe(s))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSectionBorderGlow)
} else {
  initSectionBorderGlow()
}

// ========================================
// TYPEWRITER EFFECT FOR HERO ROLE TEXT
// ========================================
function initTypewriter() {
  const el = document.querySelector('.typewriter-text')
  if (!el) return

  const roles = [
    'XR Developer',
    'AR / VR Engineer',
    'Full-Stack Developer',
    'AI Innovator',
    'Unity Specialist',
    'BCI Researcher',
  ]

  let roleIdx = 0
  let charIdx = 0
  let deleting = false
  const TYPE_SPEED = 85
  const DELETE_SPEED = 45
  const PAUSE_AFTER_WORD = 1800
  const PAUSE_BEFORE_NEXT = 300

  function tick() {
    const current = roles[roleIdx]

    if (!deleting) {
      charIdx++
      el.textContent = current.slice(0, charIdx)
      if (charIdx === current.length) {
        deleting = true
        setTimeout(tick, PAUSE_AFTER_WORD)
        return
      }
    } else {
      charIdx--
      el.textContent = current.slice(0, charIdx)
      if (charIdx === 0) {
        deleting = false
        roleIdx = (roleIdx + 1) % roles.length
        setTimeout(tick, PAUSE_BEFORE_NEXT)
        return
      }
    }

    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED)
  }

  // Start after a short initial delay
  setTimeout(tick, 1200)
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHT ON SCROLL
// ========================================
function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link')
  if (!navLinks.length) return

  const sectionIds = ['about', 'skills', 'projects', 'hackathons', 'experience', 'education', 'contact']
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  function updateActive() {
    const scrollY = window.scrollY + window.innerHeight * 0.35

    let activeId = null
    for (const sec of sections) {
      if (scrollY >= sec.offsetTop) {
        activeId = sec.id
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href')
      link.classList.toggle('active', href === `#${activeId}`)
    })
  }

  window.addEventListener('scroll', updateActive, { passive: true })
  updateActive()
}

// ========================================
// NAV BAR SHRINK ON SCROLL
// ========================================
function initNavScrolled() {
  const nav = document.querySelector('.nav-bar')
  if (!nav) return

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
