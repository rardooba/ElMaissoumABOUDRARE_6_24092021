
export const goToContent = async () => {
  const goContent = document.querySelector('.go-content');
  await window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      goContent.style.display = 'inline';
    } else {
      goContent.style.display = 'none';
    }
  });

}
