import renderInputPage from '/input-page.js';
import renderProfilePage from './profile-page.js';

const render = () => {
  const { hash } = window.location;

  if (hash === '#profile') {
    renderProfilePage();
  } else {
    renderInputPage();
  }
};

window.addEventListener('hashchange', () => {
  render();
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});
