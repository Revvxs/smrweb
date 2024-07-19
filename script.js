document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const paragraphs = document.querySelectorAll('section p');
      paragraphs.forEach((paragraph) => {
        paragraph.textContent = '';
      });
      document.querySelector(targetId + ' p').textContent = `You are now on the ${targetId.replace('#', '')} page.`;
    });
  });
});
