/* ===================================================
   app.js — Manoj Kumar A Portfolio
   =================================================== */

// ── Project Data (simulates API response) ──────────
const PROJECTS_DATA = [
  {
    id: 1,
    name: "Expense Tracker",
    icon: "💰",
    description:
      "A feature-rich Java desktop application for personal finance management. Tracks income, expenses, and savings with category-based analytics, data persistence via file I/O, and a Swing-based GUI designed for daily use.",
    tags: ["Java", "Swing GUI", "OOP", "File I/O", "Data Analytics"],
    accent: ["#63b3ed", "#4fd1c5"],
    link: "#",
  },
  {
    id: 2,
    name: "MITM Attack Analysis",
    icon: "🕵️",
    description:
      "In-depth Man-in-the-Middle attack research using Wireshark for packet capture and analysis. Documents ARP poisoning techniques, SSL stripping vectors, and proposes mitigation strategies for network defenders.",
    tags: ["Wireshark", "Network Security", "ARP Poison", "Packet Analysis", "Kali Linux"],
    accent: ["#b794f4", "#fc5c65"],
    link: "#",
  },
  {
    id: 3,
    name: "Legal AI Analyzer",
    icon: "⚖️",
    description:
      "An AI-powered tool that parses legal documents to identify key clauses, risk factors, and compliance issues. Leverages NLP pipelines to assist non-legal users in understanding complex legal language quickly.",
    tags: ["Python", "NLP", "AI/ML", "Document Parsing", "Legal Tech"],
    accent: ["#4fd1c5", "#63b3ed"],
    link: "#",
  },
];

// ── Typewriter Effect ──────────────────────────────
const ROLE_STRINGS = [
  "Cyber Security Engineer",
  "Java Developer",
  "Network Analyst",
  "Ethical Hacker",
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typeDelay = 120;

function typeRole() {
  const el = document.getElementById("roleText");
  if (!el) return;

  const current = ROLE_STRINGS[roleIdx];

  if (isDeleting) {
    charIdx--;
    typeDelay = 60;
  } else {
    charIdx++;
    typeDelay = 110;
  }

  el.textContent = current.slice(0, charIdx);

  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    typeDelay = 1800; // pause at full word
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % ROLE_STRINGS.length;
    typeDelay = 400;
  }

  setTimeout(typeRole, typeDelay);
}

// ── Render Project Cards ───────────────────────────
function renderProjects(data) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  data.forEach((project, i) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.style.transitionDelay = `${i * 0.1}s`;

    // CSS custom props for gradient bar
    card.style.setProperty("--c1", project.accent[0]);
    card.style.setProperty("--c2", project.accent[1]);

    const tagsHTML = project.tags
      .map((t) => `<span class="project-tag">${t}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-card-top">
        <span class="project-icon">${project.icon}</span>
        <span class="project-arrow">↗</span>
      </div>
      <h3 class="project-name">${project.name}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags">${tagsHTML}</div>
    `;

    card.addEventListener("click", () => {
      if (project.link && project.link !== "#") {
        window.open(project.link, "_blank", "noopener,noreferrer");
      }
    });

    grid.appendChild(card);
  });

  // Trigger reveal for newly added cards
  observeReveal();
}

// ── Simulate API Fetch ─────────────────────────────
function fetchProjects() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PROJECTS_DATA), 300);
  });
}

// ── Intersection Observer: Reveal on scroll ────────
function observeReveal() {
  const elements = document.querySelectorAll(".reveal:not(.visible)");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ── Navbar: Scroll Glass Effect ───────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastY = y;
  }, { passive: true });
}

// ── Mobile Menu Toggle ─────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    // Animate hamburger → X
    const spans = toggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans.forEach((s) => { s.style.transform = ""; s.style.opacity = ""; });
    }
  });

  // Close on link click
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
      toggle.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    });
  });
}

// ── Smooth Scroll for all anchor links ────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ── Active Nav Link Highlight ─────────────────────
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

// ── Terminal: Staggered line animation ───────────
function animateTerminal() {
  const lines = document.querySelectorAll(".t-line");
  lines.forEach((line, i) => {
    line.style.opacity = "0";
    line.style.transform = "translateX(-8px)";
    setTimeout(() => {
      line.style.transition = "all 0.3s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 800 + i * 120);
  });
}

// ── Init ───────────────────────────────────────────
async function init() {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();

  // Observe existing reveal elements
  observeReveal();

  // Hero reveals trigger immediately
  setTimeout(() => {
    document.querySelectorAll("#hero .reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 100);
    });
    animateTerminal();
  }, 100);

  // Start typewriter
  setTimeout(typeRole, 600);

  // Load and render projects
  const projects = await fetchProjects();
  renderProjects(projects);
}

document.addEventListener("DOMContentLoaded", init);