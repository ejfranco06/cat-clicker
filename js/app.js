const catButton = document.getElementsByClassName('cat-pic')[0];
let clickCounter = 0;
catButton.addEventListener('click', () => {
  const clicksEl = document.getElementsByClassName('clicks')[0];
  clickCounter++;
  clicksEl.innerHTML = `Clicks: ${clickCounter}`;
});
