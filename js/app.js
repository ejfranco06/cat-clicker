class Cat {
  constructor (name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
  }

  increaseClicks () {
    this.clicks++;
  }

  addToList () {
    const catListEl = document.getElementsByClassName('cat-model')[0];
    const fragment = document.createDocumentFragment();

    const catContainerEl = document.createElement('div');
    catContainerEl.setAttribute('class', 'cat-container');

    const infoPanelEl = document.createElement('div');
    infoPanelEl.setAttribute('class', 'info-panel');
    catContainerEl.appendChild(infoPanelEl);

    const nameEl = document.createElement('span');
    nameEl.setAttribute('class', 'name');
    nameEl.innerHTML = `Name: ${this.name}`;
    infoPanelEl.appendChild(nameEl);

    const clicksEl = document.createElement('span');
    clicksEl.setAttribute('class', 'clicks');
    clicksEl.innerHTML = `Clicks: ${this.clicks}`;
    infoPanelEl.appendChild(clicksEl);

    const figureEl = document.createElement('figure');
    const imgEl = document.createElement('img');
    imgEl.setAttribute('class', 'cat-pic');
    imgEl.setAttribute('src', `${this.image}`);
    imgEl.setAttribute('alt', 'cat');
    figureEl.appendChild(imgEl);
    catContainerEl.appendChild(figureEl);

    fragment.appendChild(catContainerEl);

    catListEl.appendChild(fragment);

    this.addClick(imgEl, clicksEl);
  }

  addClick (target, output) {
    target.addEventListener('click', () => {
      this.increaseClicks();
      output.innerHTML = `Clicks: ${this.clicks}`;
    });
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
  }
];

function createList () {
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

  catSelectorEl.addEventListener('change', (event) => {
    const catModelEl = document.getElementsByClassName('cat-model')[0];
    const catIndex = event.target.value;
    console.log(catIndex);
    catModelEl.innerHTML = '';
    allCats[catIndex].addToList();
  });
}

const allCats = [];
catSet.forEach((cat) => {
  allCats.push(new Cat(cat.name, cat.image));
});

allCats[0].addToList();

createList();
