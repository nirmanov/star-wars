const cssPromises = {};

function loadResource(src) {
  // JS Module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // Data from server
  return fetch(src)
    .then(res => res.json());
}

const appContainer = document.querySelector('main');
appContainer.innerHTML = '...loading data';

async function renderPage(moduleName, apiUrl, cssModule) {
  const [pageModule, data] = await Promise.all([
    loadResource(moduleName),
    fetch(apiUrl).then(response => response.json()),
    loadResource(cssModule),
  ]);
  const resources = [];

  if (data.planets) {
    resources.push(...data.planets);
  }

  if (data.species) {
    resources.push(...data.species);
  }

  const responseData = await Promise.all(resources.map(async (resource) => {
    const response = await fetch(resource);
    const resourceData = await response.json();
    return resourceData;
  }));

  const planetsData = responseData.filter(item => item.hasOwnProperty('rotation_period'));
  const speciesData = responseData.filter(item => item.hasOwnProperty('classification'));

  appContainer.innerHTML = '';
  appContainer.append(pageModule.render(data, navigation, planetsData, speciesData));
}

function navigation() {
  const searchParams = new URLSearchParams(location.search)
  const film = searchParams.get('film');

  if (film) {
    // detail film
    renderPage(
      './detailPage.js',
      `https://swapi.dev/api/films/${film}`,
      './css/style.css');
  } else {
    renderPage(
      './mainPage.js',
      'https://swapi.dev/api/films/',
      './css/style.css');
  }
}
navigation();

window.onpopstate = function () {
  appContainer.innerHTML = '...loading data';
  navigation();
};