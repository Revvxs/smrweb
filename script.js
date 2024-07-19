document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        if (section.id !== targetId) {
          section.classList.remove('active');
        }
        if (section.id === targetId) {
          section.classList.add('active');
        }
      });
    });
  });
  // Add an event listener to the current section
  const homeSection = document.getElementById('home');
  homeSection.addEventListener('click', () => {
    // Do nothing, keep the home section visible
  });

  // Add an event listener to the other sections
  const otherSections = document.querySelectorAll('#games, #about-us');
  otherSections.forEach((section) => {
    section.addEventListener('click', () => {
      // Hide all sections
      sections.forEach((s) => s.classList.remove('active'));
      // Show the current section
      section.classList.add('active');
    });
  });
});
