export function dataURLToBlob(dataURL: string): Blob {
  // Separate the base64 string from the data URL prefix
  const [prefix, base64] = dataURL.split(',');

  // Decode the Base64 string
  const binaryString = atob(base64);

  // Create an array of 8-bit unsigned integers
  const binaryLength = binaryString.length;
  const bytes = new Uint8Array(binaryLength);
  for (let i = 0; i < binaryLength; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Determine the MIME type from the prefix
  const mimeType = prefix.match(/:(.*?);/)?.[1] || '';

  // Create and return a Blob object
  return new Blob([bytes], { type: mimeType });
}
