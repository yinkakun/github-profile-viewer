import renderInputPage from './input-page';
import renderProfilePage from './profile-page';

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
