function animateScroll() {
  const sponsors = document.querySelector('.sponsors'),
    items = sponsors.querySelectorAll('.sponsors-container__item');

  let varible = sponsors.getBoundingClientRect().height / 2;

  window.addEventListener('scroll', () => {
    if (sponsors.offsetTop - document.documentElement.scrollTop <= varible + 50 && sponsors.offsetTop - document.documentElement.scrollTop >= -varible) {
      items.forEach((item, i) => {
        if (i === 0) {
          setTimeout(() => {
            item.classList.add('sponsors-container__item_size');
          }, 500);
        } else if (i === 1) {
          setTimeout(() => {
            item.classList.add('sponsors-container__item_size');
          }, 700);
        } else if (i === 2) {
          setTimeout(() => {
            item.classList.add('sponsors-container__item_size');
          }, 200);
        } else if (i === 4) {
          setTimeout(() => {
            item.classList.add('sponsors-container__item_size');
          }, 450);
        } else {
          item.classList.add('sponsors-container__item_size');
        }
      });
    } else {
      items.forEach(item => item.classList.remove('sponsors-container__item_size'));
    }
  });
}

export default animateScroll;