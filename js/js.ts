// PROJECT DATA (like API response)
const projects = [
  {
    title: "Expense Tracker",
    desc: "Java desktop app with analytics"
  },
  {
    title: "MITM Attack Analysis",
    desc: "Network traffic interception project"
  },
  {
    title: "Legal AI Analyzer",
    desc: "AI-based legal document checker"
  }
];

// LOAD PROJECTS (dynamic rendering)
function loadProjects() {
  const container = document.getElementById("projectContainer");

  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
    `;

    container.appendChild(card);
  });
}

// SCROLL FUNCTION
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({
    behavior: "smooth"
  });
}

// INIT (like server start)
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});