async function loadProjects() {
  try {
    const response = await fetch("assets/project_info.json");
    const projects = await response.json();
    const container = document.getElementById("projects");



    container.innerHTML = projects
      .map(project => `
        <div class="project">
          <h1>${project.title}</h1>

          ${project.software_stack ? `
            <strong>Software Stack:</strong> ${project.software_stack.join(", ")}<br/>
          ` : ""}

          ${project.fabrication_stack ? `
            <strong>Fabrication Stack:</strong> ${project.fabrication_stack.join(", ")}<br/>
          ` : ""}

          ${project.description
            ? Array.isArray(project.description)
              ? project.description.map(p => `<p>${p}</p>`).join("")
              : `<p>${project.description}</p>`
            : ""}

          ${project.images ? `
            <div class="project-images">
              ${project.images.map(src =>
                `<img src="${src}" alt="${project.title} image">`
              ).join("")}
            </div>
          ` : ""}
          
          ${project.links ? `
            <p class="links">
              ${Object.entries(project.links)
                .map(([label, url]) =>
                  `<a class="links" href="${url}" target="_blank">${label}</a>`
                )
                .join(" | ")}
            </p>
          ` : ""}

          <span class="project-footer">
            Status: ${project.status} <br>
            Last updated ${project.last_updated || "N/A"}
          </span>
        </div>
      `)
      .join("");
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

loadProjects();
