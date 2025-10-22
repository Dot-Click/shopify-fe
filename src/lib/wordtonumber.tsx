const numberWords: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const multipliers: Record<string, number> = {
  hundred: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
};

/**
 * Parses a string chunk that contains only number words (e.g., "onehundredfive").
 * @param {string} part The string chunk to parse.
 * @returns {number} The numerical value of the word chunk.
 */
function parseWordPart(part: string): number {
  // Create a regex from all known number/multiplier words to tokenize the string
  const allWords = [...Object.keys(multipliers), ...Object.keys(numberWords)];
  // Sort by length descending to greedily match longer words first (e.g., "thousand")
  allWords.sort((a, b) => b.length - a.length);
  const regex = new RegExp(allWords.join("|"), "gi");

  // Extract all valid number word tokens from the part
  const tokens = part.match(regex);
  if (!tokens) {
    return NaN;
  }

  let total = 0;
  let current = 0;

  for (const token of tokens) {
    const word = token.toLowerCase();
    if (numberWords[word] !== undefined) {
      current += numberWords[word];
    } else if (multipliers[word] !== undefined) {
      const multiplierValue = multipliers[word];
      // Apply the multiplier to the current value stack. 'a hundred' implies current=0, so we use 1.
      current = (current === 0 ? 1 : current) * multiplierValue;

      // For large multipliers, bank the current value and reset for the next phrase.
      if (multiplierValue >= 1000) {
        total += current;
        current = 0;
      }
    }
  }

  return total + current;
}

/**
 * Translates a string containing numbers as digits and words into a number.
 * Correctly handles inputs like "23twentyfive".
 * @param {string} str The input string.
 * @returns {number | string} The converted number or the original string if invalid.
 */
export function wordsToNumber(str: string): number | string {
  if (!str) return "";

  // 1. Pre-process the string to add spaces between digits and letters.
  str = str
    .replace(/([0-9]+)([a-z]+)/gi, "$1 $2")
    .replace(/([a-z]+)([0-9]+)/gi, "$1 $2")
    .toLowerCase()
    .trim();

  // 2. Split the string into major parts based on spaces or hyphens.
  const parts = str.split(/[\s-]+/).filter((p) => p && p !== "and");
  let finalString = "";

  for (const part of parts) {
    // 3. Process each part individually.
    if (!isNaN(Number(part))) {
      // If the part is a number string like "23", append it directly.
      finalString += part;
    } else {
      // If the part is a word string like "twentyfive", parse it to its numerical value.
      const partValue = parseWordPart(part);
      if (!isNaN(partValue)) {
        finalString += partValue;
      }
    }
  }

  // 4. Convert the final concatenated string to a number.
  return finalString ? Number(finalString) : str;
}

// --- Example Usage ---
