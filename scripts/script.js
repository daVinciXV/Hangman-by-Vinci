const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessText = document.querySelector(".guesses-text");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters = [], wrongGuessCount;
const maxGuesses = 6;
const resetGame = () => {
  //Resetting all game varianbles and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  gameModal.classList.remove("show");
}


const getRandomWord = () => {

  // We are going to select a random word and hint from the wordList

  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();

}

const gameOver = (isVictory) => {
  //After 600ms of game complete ... showing modal with relevant details
  setTimeout(() => {
    const modalText = isVictory ? `You got the point buddy: ` : `The word is:`;
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? 'Yaaayyyy!!! Congrats' : 'PFF ... Next Time Buddy (-_-) Game Over'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300)
}

const initGame = (button, clickedLetter) => {

  //Checking if clickedLetter is existing in the curren Word
  if (currentWord.includes(clickedLetter)) {
    //we show all the correct letters
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    })
  } else {
    //we create the hangman
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


  //calling gameOver if any of these condition is met
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}


// Now we are giving life to the buttons

for (let i = 97; i < 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);