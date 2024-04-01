export const convertHashToShortFormat = (hash: string, delimiter: string = "-"): string => {
  // Check if the input hash has at least 8 characters
  if (hash.length < 8) {
    throw new Error("Input hash must be at least 8 characters long.");
  }

  // Extract the first 4 and last 4 characters of the hash
  const firstPart = hash.substring(0, 4);
  const lastPart = hash.substring(hash.length - 4);

  // Combine the parts with the delimiter
  return `${firstPart}${delimiter}${lastPart}`;
};
