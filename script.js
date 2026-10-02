const internships = [
  { title: "Frontend Developer Intern", company: "Nova Labs", domain: "development", location: "Remote", type: "Part-time", duration: "3 months", initials: "NL" },
  { title: "UI/UX Design Intern", company: "PixelCraft Studio", domain: "design", location: "Pune, India", type: "Full-time", duration: "6 months", initials: "PC" },
  { title: "Data Analyst Intern", company: "InsightWorks", domain: "data", location: "Remote", type: "Part-time", duration: "4 months", initials: "IW" },
  { title: "Backend Developer Intern", company: "CloudNest", domain: "development", location: "Bengaluru, India", type: "Full-time", duration: "6 months", initials: "CN" },
  { title: "Digital Marketing Intern", company: "GrowthGrid", domain: "marketing", location: "Mumbai, India", type: "Part-time", duration: "3 months", initials: "GG" },
  { title: "Python Developer Intern", company: "CodeBridge", domain: "development", location: "Remote", type: "Full-time", duration: "5 months", initials: "CB" },
  { title: "Product Design Intern", company: "Orbit Works", domain: "design", location: "Hyderabad, India", type: "Full-time", duration: "4 months", initials: "OW" },
  { title: "Business Data Intern", company: "Metricly", domain: "data", location: "Pune, India", type: "Part-time", duration: "3 months", initials: "ME" },
  { title: "Content Marketing Intern", company: "BrandSpring", domain: "marketing", location: "Remote", type: "Part-time", duration: "3 months", initials: "BS" }
];

const list = document.getElementById("internshipList");
const search = document.getElementById("search");
const domain = document.getElementById("domain");
const clearBtn = document.getElementById("clearFilters");
const resetEmpty = document.getElementById("resetEmpty");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const resultCount = document.getElementById("resultCount");

function renderCards(items) {
  list.innerHTML = items.map(item => `
    <article class="card">
      <div class="card-top">
        <div class="logo" aria-hidden="true">${item.initials}</div>
        <span class="badge">${item.type}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="company">${item.company}</p>
      <div class="meta">
        <span>${item.domain[0].toUpperCase() + item.domain.slice(1)}</span>
        <span>${item.duration}</span>
      </div>
      <div class="card-footer">
        <span class="location">📍 ${item.location}</span>
        <a class="apply-link" href="#" aria-label="View ${item.title} at ${item.company}">View role →</a>
      </div>
    </article>
  `).join("");
}

function filterInternships() {
  try {
    const keyword = search.value.trim().toLowerCase();
    const selectedDomain = domain.value;

    const filtered = internships.filter(item => {
      const matchesKeyword =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        item.company.toLowerCase().includes(keyword);

      const matchesDomain =
        selectedDomain === "all" || item.domain === selectedDomain;

      return matchesKeyword && matchesDomain;
    });

    renderCards(filtered);
    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"}`;
    emptyState.hidden = filtered.length !== 0;
    list.hidden = filtered.length === 0;
    errorState.hidden = true;
  } catch (error) {
    list.hidden = true;
    emptyState.hidden = true;
    errorState.hidden = false;
    resultCount.textContent = "";
  }
}

function resetFilters() {
  search.value = "";
  domain.value = "all";
  filterInternships();
  search.focus();
}

search.addEventListener("input", filterInternships);
domain.addEventListener("change", filterInternships);
clearBtn.addEventListener("click", resetFilters);
resetEmpty.addEventListener("click", resetFilters);

filterInternships();
