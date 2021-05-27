const app = document.querySelector('#app');
import { userData } from './input-page.js';
import Header from './components/header';
import Footer from './components/footer';
import Profile from './components/profile';
import Repo from './components/repo';

const profilePage = () => {
  return `
  ${Header(userData.user.avatarUrl)}
  ${Profile(userData)}
  ${Footer()}
  `;
};

const renderProfilePage = () => {
  if (!userData) {
    window.location.hash = '';
    return;
  }

  app.innerHTML = profilePage();
  const reposList = document.querySelector('#repo-list');
  const repos = Repo(userData.user.repositories.nodes);
  reposList.innerHTML = repos;

  const menu = document.querySelector('.header__menu');
  const menuItems = document.querySelector('.header-menu-items');

  menu.addEventListener('click', () => {
    menuItems.classList.toggle('visible');
  });

  document.title = `${userData.user.login} (${userData.user.name} )`;
};

export default renderProfilePage;
