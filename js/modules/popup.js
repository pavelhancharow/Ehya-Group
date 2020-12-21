import { modalClose } from "../services/effects";

function popUp() {
  const modal = document.querySelector('.modal'),
    modalForm = modal.querySelector('.modal-form'),
    closeModal = modal.querySelector('[data-close]'),
    openModal = document.querySelectorAll('[data-open]'),
    inputs = modalForm.querySelectorAll('[data-input]');

  function modalOpen(e) {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  openModal.forEach(openModal => openModal.addEventListener('click', modalOpen));

  closeModal.addEventListener('click', () => modalClose(modal, inputs, modalForm));

  modal.addEventListener('click', (e) => (e.target === modal) ? modalClose(modal, inputs, modalForm) : null);
}

export default popUp;