const questionBoxes = document.querySelectorAll('.question-box');

questionBoxes.forEach((box) => {
  const toggle = box.querySelector('.toggle');
  const answer = box.nextElementSibling;

  toggle.addEventListener('click', () => {
    if (answer.style.display === 'none') {
      answer.style.display = 'block';
      toggle.textContent = '-';
    } else {
      answer.style.display = 'none';
      toggle.textContent = '+';
    }
  });
});
