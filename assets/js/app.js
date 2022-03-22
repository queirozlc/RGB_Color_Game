// Auxiliar Functions
const c = (element) => document.querySelector(element);
const cs = (element) => document.querySelectorAll(element);

// DOM
let numSquares = 6;
let colors = [];
let pickedColor;
const squares = cs('.box'),
  resetButton = c('.reset'),
  modeButtons = cs('.mode'),
  colorDisplay = c('.color-display'),
  winMessageDisplay = c('.message-display'),
  titleContainer = c('.title');

// Functions

function init() {
  // Storaging a color that will be used for win
  colorDisplay.textContent = pickedColor;

  // Bind modes of game
  setupMode();

  // reset a game
  reset();

  // Controll color of squares
  setupSquares();
}

function reset() {
  colors = genRandomColors(numSquares);
  pickedColor = chooseColor();
  colorDisplay.textContent = pickedColor;
  titleContainer.style.backgroundColor = '#111';
  resetButton.textContent = 'New Colors';
  winMessageDisplay.textContent = '';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener('click', function () {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        winMessageDisplay.textContent = 'Correct';

        resetButton.textContent = 'Play Again';
        changeColors(pickedColor);
      } else {
        this.style.backgroundColor = '#232323';
        winMessageDisplay.textContent = 'Try Again';
      }
    });
  }
}

function makeColor() {
  const r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function setupMode() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function () {
      for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove('selected');
      }
      this.classList.add('selected');
      if (this.textContent === 'Easy') {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      reset();
    });
  }
}

function genRandomColors(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(makeColor());
  }

  return arr;
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
    titleContainer.style.backgroundColor = color;
  }
}

function chooseColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Calling Functions
init();

resetButton.addEventListener('click', function () {
  reset();
});
