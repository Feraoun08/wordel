// src/wordUtils.js
const WORD_LENGTH = 5;

// Returns an array of 5 statuses ("correct" | "present" | "absent") for one guess,
// correctly handling duplicate letters using the standard two-pass approach.
export function getGuessStatuses(guess, answer) {
  const statuses = Array(WORD_LENGTH).fill("absent");
  const answerLetters = answer.split("");
  const guessLetters = guess.split("");

  // Pass 1: mark exact matches, and "consume" that letter from the answer
  // so it can't be matched again in pass 2.
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      statuses[i] = "correct";
      answerLetters[i] = null;
      guessLetters[i] = null;
    }
  }

  // Pass 2: for remaining letters, check if they exist elsewhere in the answer
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === null) continue;

    const foundIndex = answerLetters.indexOf(guessLetters[i]);
    if (foundIndex !== -1) {
      statuses[i] = "present";
      answerLetters[foundIndex] = null; // consume it so it can't match twice
    }
  }

  return statuses;
}