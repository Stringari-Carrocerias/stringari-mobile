export function capitalize(string) {
  if (!string || typeof string !== 'string') return string;
  let lowerString = string.toLowerCase();
  let splitString = lowerString.split(" ");
  let counter = 0;
  for (let word of splitString) {
    if (typeof word == 'number') return 
    let capitalize = word[0].toUpperCase();
    let originalWord = word;
    word = word.replace(word[0], capitalize);
    splitString[counter] = splitString[counter].replace(originalWord, word);
    counter++;
  }
  return splitString.join(" ");
}