// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let points = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        points = points + parseInt(pointValue);
      }
    }
  }
  return points;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return input.question("Let's play some scrabble! Enter a word: ");
}

function simpleScorer(word) {
  return word.length;
}

function vowelBonusScorer(word) {
  const vowel = ["a", "e", "i", "o", "u"];
  let points = 0;
  for (const letter of word) {
    if (vowel.includes(letter.toLowerCase())) {
      points = points + 3;
    } else {
      points = points + 1;
    }
  }
  return points;
}

function scrabbleScorer(word) {
  return oldScrabbleScorer(word);
}

const scoringAlgorithms = [
  {
    name: "Simple Scorer",
    descripton: "Each letter is worth one point",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    descripton: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    descripton: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log(" Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");

  const algorithmIndex = input.question("Enter 0, 1, or 2: ");

  return scoringAlgorithms[algorithmIndex];
}

function transform() {
  const transformObject = {};
  for (const points in oldPointStructure) {
    for (const letter of oldPointStructure[points]) {
      transformObject[letter.toLowerCase()] = parseInt(points);
    }
  }
  return transformObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  const word = initialPrompt();
  const scorer = scorerPrompt();
  console.log(`score for '${word}': ${scorer.scoringFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
