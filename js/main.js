'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const landingsList = document.querySelector('.menu-list__landings');
const pagesList = document.querySelector('.menu-list__pages');
const dropListSignIn = document.querySelector('.drop-list__signIn')
const dropListServices = document.querySelector('.drop-list__services');

const openMenu = () => {
  menuToggle.classList.toggle('menu-toggle__open');
};
const openLandingsList = () => {
  landingsList.classList.toggle('menu-list__landings_active');
};
const openPagesList = () => {
  pagesList.classList.toggle('menu-list__pages_active');
};
const openDropListSignIn = () => {
  dropListSignIn.classList.toggle('drop-list__signIn_active');
};
const openDropListServices = () => {
  dropListServices.classList.toggle('drop-list__services_active');
};

menuToggle.addEventListener('click', openMenu);
landingsList.addEventListener('click', openLandingsList);
pagesList.addEventListener('click', openPagesList);
dropListSignIn.addEventListener('click', openDropListSignIn);
dropListServices.addEventListener('click', openDropListServices);