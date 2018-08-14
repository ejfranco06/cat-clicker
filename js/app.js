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

  setName (name) {
    if (name !== '') {
      this.name = name;
    }
  }

  setImage (url) {
    if (url !== '') {
      this.image = url;
    }
  }

  setCount (count) {
    if (Number.isInteger(count)) {
      this.clicks = count;
    }
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
  },
  {
    name: 'doug',
    image: 'image/doug.jpg'
  }
];
const allCats = [];
let currentCat;

// ================Model===========================

// ===============View=============================

const catView = {
  render: function (cat) {
    const nameEl = document.getElementsByClassName('name')[0];
    nameEl.innerHTML = `Name: ${cat.name}`;

    const clicksEl = document.getElementsByClassName('clicks')[0];
    clicksEl.innerHTML = `Clicks: ${cat.clicks}`;

    const imgEl = document.getElementsByClassName('cat-pic')[0];
    imgEl.innerHTML = '';
    imgEl.setAttribute('src', `${cat.image}`);
    imgEl.setAttribute('alt', 'cat');
  },

  addClickEvent: function () {
    const imgEl = document.getElementsByClassName('cat-pic')[0];
    const counterEl = document.getElementsByClassName('clicks')[0];
    imgEl.addEventListener('click', () => {
      octupus.increaseClicks();
      counterEl.innerHTML = `Clicks: ${octupus.getClickCount()}`;
      adminView.render();
    });
  }
};

const listView = {
  render: function (catSet) {
    const catSelectorEl = document.getElementsByClassName('cat-selecter')[0];
    const fragment = document.createDocumentFragment();

    catSet.forEach((cat, index) => {
      const newOption = document.createElement('option');
      newOption.setAttribute('value', index);

      const name = document.createTextNode(`${cat.name}`);
      newOption.appendChild(name);
      fragment.appendChild(newOption);
    });
    catSelectorEl.innerHTML = '';
    catSelectorEl.appendChild(fragment);
  },

  addSelectHandler: function () {
    const catSelectorEl = document.getElementsByClassName('cat-selecter')[0];
    catSelectorEl.addEventListener('change', (event) => {
      const catIndex = event.target.value;
      octupus.setCurrentCat(catIndex);
      catView.render(octupus.getCurrentCat());
      adminView.render();
    });
  }
};

const adminView = {
  render: function () {
    const catInfoEl = document.getElementsByClassName('cat-info')[0];
    if (catInfoEl.classList.contains('hidden')) {
      console.log('no updte');
      return;
    }
    const cat = octupus.getCurrentCat();
    const nameEl = document.getElementsByClassName('admin-name')[0];
    nameEl.setAttribute('value', cat.name);

    const urlEl = document.getElementsByClassName('admin-url')[0];
    urlEl.setAttribute('value', cat.image);

    const clicksEl = document.getElementsByClassName('admin-clicks')[0];
    clicksEl.setAttribute('value', cat.clicks);
  },

  toggleView: function () {
    const infoEl = document.getElementsByClassName('cat-info')[0];
    infoEl.classList.toggle('hidden');
    this.render();
  },

  addAdminHandler: function () {
    const adminButton = document.getElementsByClassName('admin-btn')[0];
    adminButton.addEventListener('click', () => {
      this.render();
      this.toggleView();
    });
  },

  addCancelHandler: function () {
    const cancelButton = document.getElementsByClassName('cancel-btn')[0];
    cancelButton.addEventListener('click', () => {
      this.toggleView();
    });
  },

  addSaveHandler: function () {
    const saveButton = document.getElementsByClassName('save-btn')[0];
    saveButton.addEventListener('click', () => {
      const name = document.getElementsByClassName('admin-name')[0].value;
      const url = document.getElementsByClassName('admin-url')[0].value;
      const count = parseInt(document.getElementsByClassName('admin-clicks')[0].value);
      octupus.updateCatInfo(name, url, count);
      this.render();
    });
  },

  init: function () {
    this.render();
    this.addAdminHandler();
    this.addCancelHandler();
    this.addSaveHandler();
  }

};
// ===============View=============================

// ================Octupus========================

const octupus = {
  getClickCount: function () {
    return currentCat.clicks;
  },

  getCurrentCat: function () {
    return currentCat;
  },

  setCurrentCat: function (index) {
    currentCat = allCats[index];
  },

  increaseClicks: function () {
    currentCat.increaseClicks();
  },

  updateCatInfo: function (name, url, count) {
    currentCat.setName(name);
    currentCat.setImage(url);
    currentCat.setCount(count);
    listView.render(allCats);
    catView.render(currentCat);
  },

  init: function () {
    catSet.forEach((cat) => {
      allCats.push(new Cat(cat.name, cat.image));
    });
    currentCat = allCats[0];

    listView.render(allCats);
    listView.addSelectHandler();

    catView.render(currentCat);
    catView.addClickEvent();

    adminView.init();
  }
};
// ================Octupus========================

octupus.init();
