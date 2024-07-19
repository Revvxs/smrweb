document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript is running!");

  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("Link clicked:", e.target);
      const targetId = e.target.getAttribute('href');
      console.log("Target ID:", targetId);
      const paragraphs = document.querySelectorAll('main section p');
      paragraphs.forEach((paragraph) => {
        console.log("Paragraph:", paragraph);
        paragraph.textContent = '';
      });
      const targetParagraph = document.querySelector(`#${targetId.replace('#', '')}`);
      console.log("Target paragraph:", targetParagraph);
      if (targetParagraph) {
        targetParagraph.textContent = `You are now on the ${targetId.replace('#', '')} page.`;
      } else {
        console.log("Target paragraph not found!");
      }
    });
  });
});
