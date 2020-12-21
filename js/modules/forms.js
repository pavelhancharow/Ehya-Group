import { inputError, unchecked, modalClose } from "../services/effects";
import { postData } from "../services/services";

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
};

export default sendForm;