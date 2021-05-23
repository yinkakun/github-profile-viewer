const app = document.querySelector('#app');
import { userData } from './input-page.js';

const profilePage = /*html*/ ` <div id="profile">
    <header>header</header>
</div>`;

const renderProfilePage = () => {
  if (!userData) {
    window.location.hash = '';
    return;
  }

  app.innerHTML = profilePage;
  console.log(userData);
};

export default renderProfilePage;
