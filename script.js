 <script>
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        sections.forEach((section) => {
          if (section.id !== targetId) {
            section.style.display = 'none';
          } else {
            section.style.display = 'block';
          }
        });
      });
    });
