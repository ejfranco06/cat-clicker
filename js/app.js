// ================Model===========================
class Cat {
  constructor (name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
  }

  increaseClicks () {
    this.clicks++;
  }
}

const catSet = [
  {
    name: 'xuxa',
    image: 'image/xuxa.jpg'
  },
  {
    name: 'chewie',
    image: 'image/chewie.jpg'
  },
  {
    name: 'jetske',
    image: 'image/jetske.jpg'
  },
  {
    name: 'dave',
    image: 'image/dave.jpg'
  }
];
const allCats = [];

// ================Model===========================

// ===============View=============================

function renderCat (cat) {
  const catModelEl = document.getElementsByClassName('cat-model')[0];
  const fragment = document.createDocumentFragment();

  const catContainerEl = document.createElement('div');
  catContainerEl.setAttribute('class', 'cat-container');

  const infoPanelEl = document.createElement('div');
  infoPanelEl.setAttribute('class', 'info-panel');
  catContainerEl.appendChild(infoPanelEl);

  const nameEl = document.createElement('span');
  nameEl.setAttribute('class', 'name');
  nameEl.innerHTML = `Name: ${cat.name}`;
  infoPanelEl.appendChild(nameEl);

  const clicksEl = document.createElement('span');
  clicksEl.setAttribute('class', 'clicks');
  clicksEl.innerHTML = `Clicks: ${cat.clicks}`;
  infoPanelEl.appendChild(clicksEl);

  const figureEl = document.createElement('figure');
  const imgEl = document.createElement('img');
  imgEl.setAttribute('class', 'cat-pic');
  imgEl.setAttribute('src', `${cat.image}`);
  imgEl.setAttribute('alt', 'cat');
  figureEl.appendChild(imgEl);
  catContainerEl.appendChild(figureEl);

  fragment.appendChild(catContainerEl);
  catModelEl.innerHTML = '';
  catModelEl.appendChild(fragment);

  handleClick(imgEl, clicksEl, cat);
}

function handleClick (target, output, cat) {
  target.addEventListener('click', () => {
    cat.increaseClicks();
    output.innerHTML = `Clicks: ${cat.clicks}`;
  });
}

function renderCatList (catSet) {
  const catSelectorEl = document.getElementsByClassName('cat-selecter')[0];
  const fragment = document.createDocumentFragment();

  catSet.forEach((cat, index) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', index);

    const name = document.createTextNode(`${cat.name}`);
    newOption.appendChild(name);
    fragment.appendChild(newOption);
  });

  catSelectorEl.appendChild(fragment);
}
// ===============View=============================

// ================Octupus========================
function addHandleSelect () {
  const catSelectorEl = document.getElementsByClassName('cat-selecter')[0];
  catSelectorEl.addEventListener('change', (event) => {
    const catModelEl = document.getElementsByClassName('cat-model')[0];
    const catIndex = event.target.value;
    console.log(catIndex);
    catModelEl.innerHTML = '';
    renderCat(allCats[catIndex]);
  });
}

function init () {
  renderCatList(catSet);
  addHandleSelect();
  catSet.forEach((cat) => {
    allCats.push(new Cat(cat.name, cat.image));
  });
  renderCat(allCats[0]);
}
// ================Octupus========================

init();
