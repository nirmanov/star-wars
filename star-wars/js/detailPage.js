export function render(data, navigation, planetsData, speciesData) {
  const film = data;

  const filmContainer = document.createElement('div');
  filmContainer.className = 'film-list container';
  document.querySelector('main').append(filmContainer);

  const filmItem = document.createElement('div');
  filmItem.className = 'film-item-container';
  filmContainer.append(filmItem);
  const backButton = document.createElement('a');
  backButton.innerText = 'Back to episodes';
  backButton.href = '/';
  backButton.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', `/`)
    filmContainer.innerHTML = '...loading data';
    navigation();
  });
  filmItem.append(backButton);

  const filmTitle = document.createElement('h1');
  filmTitle.className = 'film-item-title';
  filmTitle.innerText = `Episode ${film.episode_id}: ${film.title}`;
  filmItem.append(filmTitle);

  const openingCrawlTitle = document.createElement('h2');
  openingCrawlTitle.innerText = film.opening_crawl;
  filmItem.append(openingCrawlTitle);

  const planetsTitle = document.createElement('h2');
  planetsTitle.innerText = 'Planets';
  filmItem.append(planetsTitle);

  const planetsList = document.createElement('ul');
  filmItem.append(planetsList);


  planetsData.forEach((planet) => {

    const planetItem = document.createElement('li');
    planetItem.innerText = planet.name;
    planetsList.append(planetItem);
  });

  const speciesTitle = document.createElement('h2');
  speciesTitle.innerText = 'Species';
  filmItem.append(speciesTitle);

  const speciesList = document.createElement('ul');
  filmItem.append(speciesList);

  speciesData.forEach((specie) => {

    const specieItem = document.createElement('li');
    specieItem.innerText = specie.name;
    speciesList.append(specieItem);
  });

  return filmContainer;
}