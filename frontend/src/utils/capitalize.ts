export function capitalize(str: string) {
  const capitalLetter = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1);
  return capitalLetter + restOfString;
}
