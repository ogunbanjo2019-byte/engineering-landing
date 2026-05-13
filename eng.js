const WHATSAPP_NUMBER  = "2349054633401"; 
const WHATSAPP_MESSAGE = "Hello Cruise-Way Engineering Limited, I'd like to enquire about your services. Please get back to me. Thank you!";

// API endpoint for backend
const API_ENDPOINT = "http://localhost:3000/api/send-message";

function initWhatsApp() {
  const btn = document.getElementById("whatsapp-btn");
  if (!btn) return;
  const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initHamburger() {
  const btn   = document.getElementById("hamburger");
  const links = document.getElementById("navLinks");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("open");
    const isOpen = links.classList.contains("open");
    btn.setAttribute("aria-expanded", isOpen);
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove("open");
    }
  });
}

function initScrollReveal() {
  const cards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card  = entry.target;
        const delay = parseInt(card.dataset.delay || "0", 10);

        setTimeout(() => {
          card.classList.add("visible");
          card.style.transitionDuration = ".6s";
        }, delay);

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => observer.observe(card));
}

function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function showFormMessage(message, type) {
  const messageEl = document.getElementById("formMessage");
  if (!messageEl) return;
  
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  messageEl.style.display = "block";
  
  if (type === "success") {
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 5000);
  }
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input[name='user_name']").value;
    const email = form.querySelector("input[name='user_email']").value;
    const phone = form.querySelector("input[name='user_phone']").value || "Not provided";
    const service = form.querySelector("select[name='service']").value;
    const message = form.querySelector("textarea[name='message']").value;

    const whatsappMessage = `*New Inquiry from Cruise-Way Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service}\n\n` +
      `*Message:* ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success message and redirect
    showFormMessage("✅ Opening WhatsApp to send your message...", "success");
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 1500);
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initNavbar();
  initHamburger();
  initScrollReveal();
  initScrollTop();
  initYear();
  initContactForm();
  initActiveNav();

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".service-card").forEach(c => {
      c.classList.add("visible");
    });
  }
});
