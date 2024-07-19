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
  const homeSection = document.getElementById('home');
  homeSection.classList.add('active');
});
