function accordionMenu() {
  const acc = document.querySelectorAll('.faq-card__heading'),
    testimonials = document.querySelector('.testimonials');

  let panel;

  function openItem() {
    if (testimonials.offsetTop - document.documentElement.scrollTop <= 0) {
      openText(acc[0]);
      window.removeEventListener('scroll', openItem);
    }
  }

  window.addEventListener('scroll', openItem);

  acc.forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault();
    if (this.classList.contains('heading-open')) {
      closeText(this);
    } else {
      acc.forEach(item => { closeText(item); });
      openText(this);
    }
  }));

  function openText(item) {
    item.classList.add('heading-open');
    item.children[1].innerHTML = `<use xlink:href="img/svg/times.svg#minus-solid"></use>`;
    panel = item.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  function closeText(item) {
    item.classList.remove('heading-open');
    item.children[1].innerHTML = `<use xlink:href="img/svg/times.svg#times-solid"></use>`;
    panel = item.nextElementSibling;
    panel.style.maxHeight = null;
  }

}

export default accordionMenu;