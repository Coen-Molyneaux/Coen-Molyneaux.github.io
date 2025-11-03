// Load and render all courses from JSON
async function loadCourses() {
  try {
    const response = await fetch('assets/course_info.json');
    const courses = await response.json();

    const container = document.getElementById('course-list');
    container.innerHTML = courses.map(course => `
      <div class="project course-item" data-keywords="${course.keywords}">
        <h1>${course.code} - ${course.title}</h1>
        <strong>Topics:</strong> ${course.topics.join(', ')}
        <p>${course.description}</p>
        <span class="project-footer">Year ${course.year}</span>
      </div>
    `).join('');

    initializeSearch();
  } catch (err) {
    console.error('Error loading courses:', err);
  }
}

function initializeSearch() {
  const searchBox = document.getElementById('courseSearch');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  function performSearch() {
    const searchTerm = searchBox.value.toLowerCase().trim();
    const courseItems = document.querySelectorAll('.course-item');
    let visibleCount = 0;

    courseItems.forEach(item => {
      const keywords = item.getAttribute('data-keywords');
      const courseTitle = item.querySelector('h1').textContent.toLowerCase();
      const courseContent = item.textContent.toLowerCase();
      const searchableText = `${keywords} ${courseTitle} ${courseContent}`;

      if (searchTerm === '' || searchableText.includes(searchTerm)) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (searchTerm === '') {
      resultsCount.textContent = `Showing all ${courseItems.length} courses`;
      noResults.classList.remove('show');
    } else if (visibleCount === 0) {
      resultsCount.textContent = '';
      noResults.classList.add('show');
    } else {
      resultsCount.textContent = `Found ${visibleCount} course${visibleCount !== 1 ? 's' : ''}`;
      noResults.classList.remove('show');
    }
  }

  // Event listener for live search
  searchBox.addEventListener('input', performSearch);

  // Initialize count
  const total = document.querySelectorAll('.course-item').length;
  resultsCount.textContent = `Showing all ${total} courses`;
}

// Run everything
loadCourses();
