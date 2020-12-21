import { inputValid, inputError, checked } from "../services/effects";

function validation() {
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

}

export default validation;