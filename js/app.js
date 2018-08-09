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
    const catListEl = document.getElementsByClassName('cat-list')[0];
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
  new Cat('xuxa', 'image/xuxa.jpg'),
  new Cat('chewie', 'image/chewie.jpg')
];

catSet[0].addToList();
catSet[1].addToList();
