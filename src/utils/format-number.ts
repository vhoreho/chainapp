import numeral from "numeral";

// ----------------------------------------------------------------------

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fCurrency(number: number) {
  const format = number ? numeral(number).format("$0,0.00") : "";

  return result(format, ".00");
}

export function fPercent(number: number) {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(number: number) {
  const format = number ? numeral(number).format("0.00a") : "";

  return result(format, ".00");
}

export function fData(number: number) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}

export function addApostrophes(price: number): string {
  // Convert the number to a string
  let priceStr = price.toString();

  // Split the string into integer and decimal parts
  const parts = priceStr.split(".");

  // Add apostrophes for the integer part
  let formattedInteger = "";
  let count = 0;
  for (let i = parts[0].length - 1; i >= 0; i--) {
    formattedInteger = parts[0][i] + formattedInteger;
    count++;
    if (count % 3 === 0 && i !== 0) {
      formattedInteger = "'" + formattedInteger;
    }
  }

  // Combine the integer part with the decimal part (if exists)
  const formattedPrice = parts.length > 1 ? formattedInteger + "." + parts[1] : formattedInteger;

  return formattedPrice;
}
