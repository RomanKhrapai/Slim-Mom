export function useFilterSringToQuery(string) {
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const codeChar = string.charCodeAt(i);
    if (codeChar === 40 || codeChar === 41) {
      break;
    }
    if (
      (codeChar > 64 && codeChar < 123) ||
      (codeChar > 1024 && codeChar < 1112) ||
      codeChar === 32
    ) {
      newString += string[i];
    }
  }
  return newString;
}
