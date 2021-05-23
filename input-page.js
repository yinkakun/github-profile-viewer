const app = document.querySelector('#app');
const GITHUB_ACCESS_TOKEN = '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';
let userData = null;

const inputPageMarkup = /*html*/ `
      <div class="input-page">
        <main>
          <div class="input-page-flash visually-hidden">hello</div>

          <h1 class="input-page__heading">View Github Profile</h1>

          <form id="input-form" class="input-page-form">
            <input
              type="text"
              id="search-input"
              placeholder="Your Github Username"
              class="input-page-form__input"
            />

            <button type="submit" class="input-page-form__button">
              view profile
            </button>
          </form>
        </main>

        <footer class="input-page-footer">
          <p>
            Made by <a href="https://twitter.com/yinkakun">Yinka Adedire</a>
          </p>
          <p>
            View Source code on <a href="https://github.com/yinkakun">Github</a>
          </p>
        </footer>
      </div>
`;

const fetchProfile = async (githubUsername) => {
  const query = JSON.stringify({
    query: `{
          user(login: "${githubUsername}") {
            bio
            name
            url
            repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
              totalCount
              nodes {
                forkCount
                isArchived
                name
                url
                primaryLanguage {
                  color
                  name
                }
                description
                stargazerCount
                forks {
                  totalCount
                }
                updatedAt
              }
            }
            email
            avatarUrl(size: 10)
            followers {
              totalCount
            }
            following {
              totalCount
            }
            projectsUrl
            login
            websiteUrl
            twitterUsername
            company
            location
          }
        }`,
  });

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'token ' + GITHUB_ACCESS_TOKEN,
    },
    body: query,
  });

  const data = await response.json();
  return data;
};

const renderInputPage = () => {
  app.innerHTML = inputPageMarkup;
  const inputForm = document.querySelector('#input-form');
  const flashMessage = document.querySelector('.input-page-flash');

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target.querySelector('#search-input').value.trim('');
    e.target.reset();
    if (!username) return;

    flashMessage.classList.remove('visually-hidden');
    flashMessage.classList.remove('input-page-flash--error');
    flashMessage.textContent = 'loading';

    fetchProfile(username)
      .then((profile) => {
        if (profile.errors) {
          flashMessage.classList.add('input-page-flash--error');

          flashMessage.textContent = `${username} doesn't appear to be on GitHub at all.`;
        } else {
          userData = profile.data;
          flashMessage.textContent = `successful`;
          window.location.hash = '#profile';
        }
      })
      .catch((error) => {
        flashMessage.classList.add('input-page-flash--error');
        flashMessage.textContent = `something went wrong, please try again`;
        console.log(error);
      });
  });
};

export default renderInputPage;
export { userData };
