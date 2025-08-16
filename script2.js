// DOM Elements
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const skillItems = document.querySelectorAll(".skill-item")
const statNumbers = document.querySelectorAll(".stat-number")
const form = document.querySelector(".contact-form")
const navLinks = document.querySelectorAll(".nav-link")

// Custom Cursor
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let followerX = 0
let followerY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1
  cursorY += (mouseY - cursorY) * 0.1
  followerX += (mouseX - followerX) * 0.05
  followerY += (mouseY - followerY) * 0.05

  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
  cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`

  requestAnimationFrame(animateCursor)
}

animateCursor()

// Cursor hover effects
document.querySelectorAll("a, button, .portfolio-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform += " scale(1.5)"
    cursorFollower.style.transform += " scale(1.2)"
  })

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "")
    cursorFollower.style.transform = cursorFollower.style.transform.replace(" scale(1.2)", "")
  })
})

// Mobile Navigation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")

  const spans = hamburger.querySelectorAll("span")
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")

    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Portfolio Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    portfolioItems.forEach((item) => {
      const category = item.getAttribute("data-category")

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden")
        item.style.animation = "fadeInUp 0.5s ease forwards"
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")

      if (entry.target.classList.contains("skill-item")) {
        const skillProgress = entry.target.querySelector(".skill-progress")
        const skillValue = entry.target.getAttribute("data-skill")
        setTimeout(() => {
          skillProgress.style.width = skillValue + "%"
        }, 200)
      }

      if (entry.target.classList.contains("stat-number")) {
        animateCounter(entry.target)
      }
    }
  })
}, observerOptions)

document.querySelectorAll(".about-card, .skill-item, .portfolio-item, .contact-card, .stat-number").forEach((el) => {
  el.classList.add("animate-on-scroll")
  observer.observe(el)
})

// Counter Animation
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-count"))
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += step
    element.textContent = Math.floor(current)

    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")

  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)"
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Form Handling
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
    submitBtn.style.background = "var(--secondary)"

    form.reset()

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""
    }, 3000)
  }, 2000)
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Typing Animation for Hero
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const originalText = heroSubtitle.textContent

  setTimeout(() => {
    typeWriter(heroSubtitle, originalText, 50)
  }, 2000)
})

// 3D Tilt Effect for Portfolio Cards
document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
  })
})

// Loading Screen
window.addEventListener("load", () => {
  const loading = document.querySelector(".loading")
  if (loading) {
    setTimeout(() => {
      loading.classList.add("hidden")
    }, 1000)
  }
})

// Particle System for Background
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.init()
  }

  init() {
    this.canvas.style.position = "fixed"
    this.canvas.style.top = "0"
    this.canvas.style.left = "0"
    this.canvas.style.width = "100%"
    this.canvas.style.height = "100%"
    this.canvas.style.pointerEvents = "none"
    this.canvas.style.zIndex = "-1"
    this.canvas.style.opacity = "0.1"

    document.body.appendChild(this.canvas)

    this.resize()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resize())
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fillStyle = "#0891b2"
      this.ctx.fill()
    })

    requestAnimationFrame(() => this.animate())
  }
}

new ParticleSystem()

console.log("🚀 Dark Portfolio website loaded successfully!")
