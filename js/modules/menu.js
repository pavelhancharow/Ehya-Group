function hamburgerMenu() {
  const menuToggle = document.querySelector('.menu-toggle'),
    menuListItem = document.querySelectorAll('.menu-list__item');

  function closeAllList(list, selector) {
    list.forEach(item => {
      if (item.hasAttribute('style')) {
        item.style.cssText = '';
        item.children[1].style.cssText = '';
      }
      item.lastElementChild.classList.remove(selector);
    });
  }

  function openList(item, selector) {
    item.style.cssText = 'color: #1565D8; font-weight: 600;';
    item.children[1].style.cssText = 'fill: #1565D8; transform: rotate(0deg);';
    item.lastElementChild.classList.add(selector);
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu-toggle .hamburger')) {
      menuToggle.classList.add('menu-toggle__open');
    } else if (e.target.closest('.menu-toggle .cross') || !e.target.closest('.menu') || e.target.closest('.menu-list__link') || e.target.closest('.service-list__link')) {
      menuToggle.classList.remove('menu-toggle__open');
      closeAllList(menuListItem, 'drop-list__active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && menuToggle.classList.contains('menu-toggle__open')) {
      menuToggle.classList.remove('menu-toggle__open');
      closeAllList(menuListItem, 'drop-list__active');
    }
  });

  menuListItem.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault();

    const listActive = item.lastElementChild.classList.contains('drop-list__active'),
      dropListItem = item.querySelectorAll('.drop-list__item');

    if (e.target.closest('.menu-list__dropdown') && !e.target.closest('.drop-list') && listActive) {
      closeAllList(menuListItem, 'drop-list__active');
      closeAllList(dropListItem, 'service-list__active');
    } else if (e.target.closest('.menu-list__dropdown') && !e.target.closest('.drop-list')) {
      closeAllList(menuListItem, 'drop-list__active');
      closeAllList(dropListItem, 'service-list__active');
      openList(item, 'drop-list__active');
    } else if (e.target.closest('.menu-button')) {
      closeAllList(menuListItem, 'drop-list__active');
      closeAllList(dropListItem, 'service-list__active');
      menuToggle.classList.remove('menu-toggle__open');
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        document.querySelector('.modal').style.display = 'block';
      }, 1000);
    }

    dropListItem.forEach(list => {
      const listActive = list.lastElementChild.classList.contains('service-list__active');

      if (e.target.closest('.drop-list__item') === list && !e.target.closest('.service-list') && listActive) {
        closeAllList(dropListItem, 'service-list__active');
      } else if (e.target.closest('.drop-list__item') === list && !e.target.closest('.service-list')) {
        closeAllList(dropListItem, 'service-list__active');
        openList(list, 'service-list__active');
      }
    });

  }));

}

export default hamburgerMenu;