document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const paragraphs = document.querySelectorAll('main section p');
      paragraphs.forEach((paragraph) => {
        paragraph.textContent = '';
      });
      const targetParagraph = document.querySelector(`#${targetId.replace('#', '')}`);
      targetParagraph.textContent = `You are now on the ${targetId.replace('#', '')} page.`;
    });
  });
});
