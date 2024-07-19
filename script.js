const qnas = document.querySelectorAll('#qna h2');

qnas.forEach((qa) => {
  qa.addEventListener('click', () => {
    const answer = qa.nextElementSibling;
    answer.style.display = (answer.style.display === 'none') ? 'block' : 'none';
  });
});
