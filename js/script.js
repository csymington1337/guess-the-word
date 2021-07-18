const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const duckHuntDog = document.querySelector(".duck-hunt-dog");
const happyDance = document.querySelector(".happy-dance");
const guessFormElement = document.querySelector("#guess-label");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 15;

const getWord = async function () {
    const resp = await fetch(
      "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await resp.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    word = wordArray[randomIndex].trim();
    updatePlaceholder(word);
    console.log(word);
  };

getWord();

const updatePlaceholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

updatePlaceholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const validGuess = validateInput(guess);

    if (validGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Oops, you didn't enter anything! Try a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "I like the enthusiasm, but that's too many letters. Try again!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Well, that was very creative... How about just a regular letter now?";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Is there an echo in here? You've already guessed that letter!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updatePlayerGuesses();
        checkRemainingGuesses(guess);
        updateWord(guessedLetters);
    }
};

const updatePlayerGuesses = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    //console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkIfWon();
};

const checkRemainingGuesses = function (guess) {
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = `Uh oh! Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word does have the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `<p>Game over, you lose!<br>The word was ${word.toUpperCase()}, better luck next time!</p>`;
        duckHuntDog.classList.remove("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        guessFormElement.classList.add("hide");
        wordInProgress.classList.add("hide");
        letterInput.classList.add("hide");
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Woohoo!</p>`;
        happyDance.classList.remove("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        guessFormElement.classList.add("hide");
        wordInProgress.classList.add("hide");
        letterInput.classList.add("hide");
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerText = "";
    remainingGuesses = 15;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    duckHuntDog.classList.add("hide");
    happyDance.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    guessFormElement.classList.remove("hide");
    wordInProgress.classList.remove("hide");
    letterInput.classList.remove("hide");
    getWord();
});