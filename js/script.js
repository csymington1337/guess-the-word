const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 5;

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
    if (guessedLetters.includes()) {
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
        message.innerText = `Oh noooo, you're out of guesses. The word was ${word}, better luck next time!`;
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};