function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString().substring(-2); // Get last two digits of the year

  return `${day}/${month}/${year}`;
}

// Step 2: Function to generate a random letter
function getRandomLetter() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

// Step 3: Function to generate a random 4-digit number
function getRandomNumber() {
  return Math.floor(Math.random() * 9000 + 1000); // Number between 1000 and 9999
}

// Combine all steps to generate the unique ID
export function generateReportID() {
  const datePart = getCurrentDate();
  const letterPart = getRandomLetter();
  const numberPart = getRandomNumber();

  return `${datePart}/${letterPart}${numberPart}`;
}
