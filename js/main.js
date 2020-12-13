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
      openModal = document.querySelector('[data-open]'),
      inputs = modalForm.querySelectorAll('[data-input]');

    function modalClose() {
      modal.style.display = '';
      document.body.style.overflow = '';
      inputs.forEach(item => {
        if (item.id === 'singUp-checked') {
          checked(item);
        } else {
          inputValid(item, item.parentElement);
        }
      });

      modalForm.reset();
    }

    function modalOpen(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    openModal.addEventListener('click', modalOpen);
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

  function unchecked(selector) {
    selector.nextElementSibling.classList.add('modal-form__label_error');
    selector.nextElementSibling.textContent = 'Do you agree to the terms & conditions?';
  }

  function checked(selector) {
    selector.nextElementSibling.classList.remove('modal-form__label_error');
    selector.nextElementSibling.textContent = 'Agree to terms & conditions';
  }

  const validation = () => {
    const enterInputs = document.querySelectorAll('[data-input]');

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

    enterInputs.forEach(item => item.addEventListener('change', () => {
      item.value = item.value.trim();
      if (item.id === 'singUp-email') {
        validateEmail(item, item.parentElement);
      }
    }));

    enterInputs.forEach(item => item.addEventListener('input', () => {

      if (item.id === 'singUp-name') {
        item.value = item.value.replace(/[^a-z\s]/ig, '');
        inputValid(item, item.parentElement);
      } else if (item.id === 'singUp-pass') {
        const reg = /[^\W+]/ig;
        if (reg.test(item.value)) {
          item.value = item.value.replace(/[^\W+]/ig, '*');
          inputValid(item, item.parentElement);
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
      } else if (item.id === 'singUp-checked') {
        checked(item);
      }

    }));

  };

  validation();

  const sendForm = () => {
    const form = document.querySelector('.modal-form'),
      inputs = form.querySelectorAll('[data-input]');

    inputs.forEach(item => item.required = false);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      inputs.forEach((input, i) => {
        if (input.value === '') {
          inputError(input, input.parentElement);
        } else if (i === 3 && !input.checked) {
          unchecked(input);
        }
      });

      if (inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '' || !inputs[3].checked) {
        return;
      }

      const formData = new FormData(form);
      let object = {};
      formData.forEach((val, key) => object[key] = val);

      postData(object)
        .then(resolve => {
          if (resolve.status !== 200) {
            throw new Error('status network not 200.');
          }
          console.log('ok');
        })
        .catch(error => console.warn(error))
        .finally(() => form.reset());
    });

    const postData = (object) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      });
    };
  };

  sendForm();
});