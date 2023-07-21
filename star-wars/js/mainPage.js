export function render(data, navigation) {
  const films = data.results;
  const filmsContainer = document.createElement('div');
  filmsContainer.className = 'film-list container';


  films.forEach((film, index) => {
    const filmItem = document.createElement('div');
    filmItem.className = 'film-item-container';
    const filmUrl = document.createElement('a');
    filmUrl.className = 'film-item-link';
    const detailUrl = film.url.split('/films/')[1];
    filmUrl.href = `?film=${detailUrl}`;
    filmUrl.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', `?film=${detailUrl}`)
      filmsContainer.innerHTML = '...loading data';
      navigation();
    });
    const number = document.createElement('span');
    number.className = 'film-item-number';
    const filmTitle = document.createElement('span');
    filmTitle.className = 'film-item-title';
    number.innerText = index + 1;
    filmTitle.innerText = film.title;
    filmsContainer.append(filmItem);
    filmItem.append(filmUrl);
    filmUrl.append(number);
    filmUrl.append(filmTitle);
  });

  return filmsContainer;
}