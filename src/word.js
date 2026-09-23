
export const VALID_WORDS = [
  "CRANE", "SNAKE", "HORSE", "TRAIL", "STONE",
  "RIVER", "SPARK", "GHOST", "PLAIN", "SMOKE",
  "WAGON", "BRAVE", "SHINE", "FLAME", "STORM",
];


export function getRandomWord() {
  const index = Math.floor(Math.random() * VALID_WORDS.length);
  return VALID_WORDS[index];
}