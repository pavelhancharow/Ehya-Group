import { getResours } from "../services/services";

function cards() {
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
}

export default cards;