document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        section.classList.remove('active');
      });
      document.getElementById(targetId.substring(1)).classList.add('active');
    });
  });
});
