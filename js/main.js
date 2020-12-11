'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const hamburgerMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle'),
      menuListItem = document.querySelectorAll('.menu-list__item'),
      dropListItem = document.querySelectorAll('.drop-list__item');

    document.addEventListener('click', (e) => {
      if (e.target.closest('.menu-toggle .hamburger')) {
        menuToggle.classList.add('menu-toggle__open');
      } else if (e.target.closest('.menu-toggle .cross') || !e.target.closest('.menu')) {
        menuToggle.classList.remove('menu-toggle__open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && menuToggle.classList.contains('menu-toggle__open')) {
        menuToggle.classList.remove('menu-toggle__open');
      }
    });

    function toggleList(list, activelist, droplist) {
      list.forEach(item => item.addEventListener('click', (e) => {
        e.preventDefault();
        const listActive = item.lastElementChild.classList.contains(activelist);
        if ((e.target.matches(droplist) && listActive)) {
          console.log(e.target);
          closeList(item, activelist);
        } else if (e.target.closest(droplist)) {
          openList(item, activelist);
        }
      }));
    }

    toggleList(menuListItem, 'drop-list__active', '.menu-list__dropdown');
    toggleList(dropListItem, 'service-list__active', '.drop-list__dropdown');

    function openList(item, selector) {
      item.style.cssText = 'color: #1565D8; font-weight: 600;';
      item.children[1].style.fill = '#1565D8';
      item.lastElementChild.classList.add(selector);
    }

    function closeList(item, selector) {
      item.style.cssText = '';
      item.children[1].style.fill = '';
      item.lastElementChild.classList.remove(selector);
    }
  };

  hamburgerMenu();
});