window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const hamburgerMenu = () => {
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

  };

  hamburgerMenu();

  const popUp = () => {
    const modal = document.querySelector('.modal'),
      modalForm = modal.querySelector('.modal-form'),
      closeModal = modal.querySelector('[data-close]'),
      openModal = document.querySelectorAll('[data-open]'),
      email = document.getElementById('singUp-email');

    function modalClose() {
      modal.style.display = '';
      document.body.style.overflow = '';
      inputValid(email, email.parentElement);
      modalForm.reset();
    }

    closeModal.addEventListener('click', modalClose);
    modal.addEventListener('click', (e) => (e.target === modal) ? modalClose() : null);
  };

  popUp();

  function inputError(input, label) {
    if (label.lastElementChild.tagName === "SPAN") {
      return;
    } else {
      const span = document.createElement('span');
      span.classList.add('input-validate');
      span.textContent = `Enter correct ${input.name[0].toUpperCase() + input.name.slice(1)}`;
      label.append(span);
      input.classList.add('modal-form__input_valid');
    }
  }

  function inputValid(input, label) {
    if (label.lastElementChild.tagName === 'SPAN') {
      input.classList.remove('modal-form__input_valid');
      label.lastElementChild.remove();
    } else {
      return;
    }
  }

  const validation = () => {
    const enterInputs = document.querySelectorAll('.modal-form__input');

    function validateEmail(input, label) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(input.value).toLowerCase())) {
        inputValid(input, label);
        return;
      } else if (input.value === '') {
        inputValid(input, label);
      } else {
        inputError(input, label);
      }
    }

    const email = document.querySelector('#singUp-email');
    email.addEventListener('change', () => validateEmail(email, email.parentElement));

    enterInputs.forEach(item => item.addEventListener('input', () => {

      if (item.id === 'singUp-name') {
        item.value = item.value.replace(/[^a-z\s]/ig, '');
      } else if (item.id === 'singUp-pass') {
        const reg = /[^\W+]/ig;
        if (reg.test(item.value)) {
          item.value = item.value.replace(/[^\W+]/ig, '*');
        } else {
          item.value = item.value.replace(/[^\w]/gi, '');
        }
      } else if (item.id === 'singUp-email') {
        item.value = item.value.replace(/[^\S]/gi, '');
        item.value.toLowerCase();

        if (item.classList.contains('modal-form__input_valid')) {
          validateEmail(item, item.parentElement);
        } else {
          item.classList.remove('modal-form__input_valid');
        }
      }

    }));

  };

  validation();
});