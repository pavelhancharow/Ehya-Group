require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import accordion from "./modules/accordion";
import cards from "./modules/cards";
import forms from "./modules/forms";
import menu from "./modules/menu";
import popup from "./modules/popup";
import scroll from "./modules/scroll";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import validation from "./modules/validation";

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  accordion();
  cards();
  forms();
  menu();
  popup();
  scroll();
  slider();
  tabs();
  validation();

});