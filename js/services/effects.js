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

export { modalClose };
export { inputError };
export { inputValid };
export { unchecked };
export { checked };
