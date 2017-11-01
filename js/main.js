(function () {
'use strict';

const SERVER_URL = `https://swapi.co/api/people/`;

/*---Model---*/
const loadData = (path = SERVER_URL) => {
  return fetch(path).then(
    (res) => res.json(),
    (err) => window.console.log(err));
};

/*---View---*/
const renderTable = (persons) => {
  const container = document.querySelector(`.table__tbody`);

  const rows = persons.map((person) => {
    const checked = window.sessionStorage.getItem(`${person.name}`) || ``;
    const row = `
      <tr class="table table__tr" data-person="${person.name}">
      <td class="table table__td table__td--like">
      <input class="table table__checkbox" type="checkbox" ${checked}>
      <label><label>
      </td>
      <td class="table table__td table__td--name">${person.name}</td>
      <td class="table table__td table__td--gender">${person.gender}</td>
      <td class="table table__td table__td--birth_year">${person.birth_year}</td>
      <td class="table table__td table__td--height">${person.height}</td>
      </tr>`;
    return row;
  }).join(``);
  container.innerHTML = rows;
};

const clickHandler = (event) => {
  const row = event.currentTarget;
  const person = row.dataset.person;
  const checkbox = row.querySelector(`input`);
  if (checkbox.checked) {
    checkbox.checked = false;
    window.sessionStorage.removeItem(person);
  } else {
    checkbox.checked = true;
    window.sessionStorage.setItem(person, `checked`);
  }
};

/*---Controller---*/
loadData().then((data) => {
  let persons = data.results;
  renderTable(persons);

  const rows = document.querySelectorAll(`.table__tr`);
  rows.forEach((row) => {
    row.addEventListener(`click`, (event) => {
      event.preventDefault();
      clickHandler(event);
    });
  });
});

}());

//# sourceMappingURL=main.js.map
