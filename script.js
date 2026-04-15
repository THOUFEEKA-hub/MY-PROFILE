const body = document.body;
const pageLoader = document.getElementById("pageLoader");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navPanel = document.getElementById("navPanel");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const revealItems = document.querySelectorAll(".reveal");
const sections = [...document.querySelectorAll("main section[id]")];
const typingText = document.getElementById("typingText");
const projectButtons = document.querySelectorAll(".project-details-btn");
const projectModal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStack = document.getElementById("modalStack");
const modalLive = document.getElementById("modalLive");
const modalGithub = document.getElementById("modalGithub");
const scrollTopBtn = document.getElementById("scrollTopBtn");

const roles = [
  "Aspiring Prompt Engineer",
  "AI Enthusiast",
  "Web Developer"
];
const projectData = {
  prompt: {
    category: "AI Project",
    title: "AI Prompt Library",
    description:
      "A collection of structured prompts designed to generate accurate, consistent, and high-quality AI outputs.",
    stack: ["Prompt Engineering", "AI Tools"],
    live: "#",
    github: "https://github.com/THOUFEEKA-hub",
  },
  calculator: {
    category: "Frontend Project",
    title: "Calculator Web Application",
    description:
      "A responsive calculator built using HTML, CSS, and JavaScript with clean UI and smooth functionality.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://thoufeeka-hub.github.io/MY-PROFILE/",
    github: "https://github.com/THOUFEEKA-hub",
  },
  gamehub: {
    category: "Frontend Project",
    title: "Game Hub Project",
    description:
      "A web platform to showcase multiple games with a structured layout and responsive design.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://game-hub-five-orcin.vercel.app/",
    github: "https://github.com/THOUFEEKA-hub/game-hub",
  }
};
body.classList.add("is-loading");
window.addEventListener("load", () => {
  pageLoader?.classList.add("is-hidden");
  body.classList.remove("is-loading");
});


const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light-mode");

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const theme = body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", theme);
});


menuToggle?.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
  });
});


const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!activeLink || !entry.isIntersecting) return;

    navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  });
}, { threshold: 0.2 });

sections.forEach((section) => sectionObserver.observe(section));

function startTyping(words, element) {
  if (!element) return;

  let i = 0, j = 0, deleting = false;

  function type() {
    const word = words[i];
    element.textContent = word.slice(0, j);

    if (!deleting && j < word.length) {
      j++;
      setTimeout(type, 90);
    } else if (!deleting && j === word.length) {
      deleting = true;
      setTimeout(type, 1200);
    } else if (deleting && j > 0) {
      j--;
      setTimeout(type, 50);
    } else {
      deleting = false;
      i = (i + 1) % words.length;
      setTimeout(type, 200);
    }
  }

  type();
}

startTyping(roles, typingText);


function openProjectModal(key) {
  const project = projectData[key];
  if (!project || !projectModal) return;

  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalLive.href = project.live;
  modalGithub.href = project.github;
  modalStack.innerHTML = project.stack.map(s => `<span>${s}</span>`).join("");

  projectModal.classList.add("is-open");
  body.style.overflow = "hidden";
}

function closeProjectModal() {
  projectModal.classList.remove("is-open");
  body.style.overflow = "";
}

projectButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    openProjectModal(btn.dataset.project);
  });
});

modalClose?.addEventListener("click", closeProjectModal);
modalBackdrop?.addEventListener("click", closeProjectModal);


window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn?.classList.add("is-visible");
  } else {
    scrollTopBtn?.classList.remove("is-visible");
  }
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});