function tabs() {
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
}

export default tabs;