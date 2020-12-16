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

  function modalClose(modal, inputs, form) {
    modal.style.display = '';
    document.body.style.overflow = '';
    inputs.forEach(item => {
      if (item.id === 'singUp-checked') {
        checked(item);
      } else {
        inputValid(item, item.parentElement);
      }
    });
    if (form) {
      form.reset();
    }
  }

  const popUp = () => {
    const modal = document.querySelector('.modal'),
      modalForm = modal.querySelector('.modal-form'),
      closeModal = modal.querySelector('[data-close]'),
      openModal = document.querySelector('[data-open]'),
      inputs = modalForm.querySelectorAll('[data-input]');

    function modalOpen(e) {
      e.preventDefault();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    openModal.addEventListener('click', modalOpen);
    closeModal.addEventListener('click', () => {
      modalClose(modal, inputs, modalForm);
    });

    modal.addEventListener('click', (e) => (e.target === modal) ? modalClose(modal, inputs, modalForm) : null);
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
    const modal = document.querySelector('.modal'),
      form = modal.querySelector('.modal-form'),
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
        .finally(() => {
          form.reset();
          setTimeout(() => {
            modalClose(modal, inputs);
          }, 1500);
        });
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

  const tabs = () => {
    const typeParent = document.querySelector('.install-type'),
      typeItem = typeParent.querySelectorAll('.install-type__item'),
      lineParent = document.querySelector('.install-line');

    typeItem.forEach((item, i) => {
      createSpan(item.textContent, typeItem[3].textContent, 'dotnet');

      if (i === 0) {
        item.classList.add('install-type__item_active');
        showResult(i);
      }
    });

    typeParent.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('install-type__item')) {
        typeItem.forEach((item, i) => {
          if (e.target === item) {
            item.classList.add('install-type__item_active');
            showResult(i);
          } else {
            item.classList.remove('install-type__item_active');
          }
        });
      }
    });

    function createSpan(name, changeName, newName) {
      if (name === changeName) {
        name = newName;
      }
      name = name.toLowerCase();

      lineParent.insertAdjacentHTML('beforeend', `
        <span class="install-line__item"><span class="install-line__item_bold">$</span>
                ${name} install <span class="install-line__item_aqua">-g</span> ehya.js|</span>
      `);
    }

    function showResult(iterator) {
      for (let i = 0; i < lineParent.children.length; i++) {
        const elem = lineParent.children[i];
        if (i === iterator) {
          elem.classList.add('install-line__item_active');
        } else {
          elem.classList.remove('install-line__item_active');
        }
      }
    }
  };

  tabs();

  const cards = () => {
    class MenuCard {
      constructor(src, title, description, parentSelector, ...classes) {
        this.src = src;
        this.title = title;
        this.description = description;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
      }

      render(itemSelector) {
        const elem = document.createElement('div');

        if (this.classes.length === 0) {
          this.classes = itemSelector;
          elem.classList.add(this.classes);
        } else {
          this.classes.forEach(className => {
            elem.classList.add(className);
          });
        }

        return elem;
      }

      renderFeatures() {
        const elem = this.render('features-item');

        elem.innerHTML = `
            <svg class="features-item__img card-icon">
              <use xlink:href=${this.src}></use>
            </svg>
            <span class="features-item__title">${this.title}</span>
            <span class="features-item__description">${this.description}</span>
            <a href="#" class="features-item__link link">
              Learn more
              <svg class="features-item__link_img arrow-more">
                <use xlink:href="img/svg/pointers.svg#arrow-right"></use>
              </svg>
            </a>
        `;

        this.parent.append(elem);
      }

      renderHero() {
        const elem = this.render('hero-card');

        elem.innerHTML = `
            <svg class="hero-card__img card-icon">
              <use xlink:href=${this.src}></use>
            </svg>
            <div class="hero-card__info">
              <strong class="hero-card__title">${this.title}</strong>
              <span class="hero-card__subtitle">${this.description}</span>
            </div>
        `;

        this.parent.append(elem);
      }

      renderInformation() {
        const elem = this.render('information-card');

        elem.innerHTML = `
              <div class="information-card__oval">
                <svg class="information-card__img info-sprites">
                  <use xlink:href=${this.src}></use>
                </svg>
              </div>
              <span class="information-card__info">${this.title}</span>
              <span class="information-card__text">${this.description}</span>
        `;

        this.parent.append(elem);
      }
    }

    const getResours = async (url) => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    };

    getResours('db.json')
      .then(data => {
        data.featuresCards.forEach(({ img, title, descr }) => {
          new MenuCard(img, title, descr, '.features-container').renderFeatures();
        });
      });

    getResours('db.json')
      .then(data => {
        data.heroCards.forEach(({ img, title, descr }) => {
          new MenuCard(img, title, descr, '.hero-cards').renderHero();
        });
      });

    getResours('db.json')
      .then(data => {
        data.informationCards.forEach(({ img, title, descr }) => {
          new MenuCard(img, title, descr, '.information-table').renderInformation();
        });
      });
  };

  cards();

  const screen = () => {
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
  };

  screen();
});