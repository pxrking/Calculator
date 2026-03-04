const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function log(a) {
  return Math.log(a);
}

function percentage(a, b) {
  return (a / 100) * b;
}

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("\n=== Simple Calculator ===");
  console.log("1. Addition");
  console.log("2. Subtraction");
  console.log("3. Multiplication");
  console.log("4. Logarithm (ln)");
  console.log("5. Percentage");
  console.log("6. Exit\n");

  const choice = await prompt("Choose an operation (1-6): ");

  if (choice === "6") {
    console.log("Goodbye!");
    rl.close();
    return;
  }

  if (!["1", "2", "3", "4", "5"].includes(choice)) {
    console.log("Invalid choice. Try again.");
    return main();
  }

  if (choice === "5") {
    const num1 = parseFloat(await prompt("Enter the percentage: "));
    const num2 = parseFloat(await prompt("Enter the number: "));
    if (isNaN(num1) || isNaN(num2)) {
      console.log("Invalid numbers. Try again.");
      return main();
    }
    const result = percentage(num1, num2);
    console.log(`\n${num1}% of ${num2} = ${result}`);
    return main();
  }

  if (choice === "4") {
    const num = parseFloat(await prompt("Enter a number: "));
    if (isNaN(num) || num <= 0) {
      console.log("Invalid input. Logarithm requires a positive number.");
      return main();
    }
    const result = log(num);
    console.log(`\nln(${num}) = ${result}`);
    return main();
  }

  const num1 = parseFloat(await prompt("Enter first number: "));
  const num2 = parseFloat(await prompt("Enter second number: "));

  if (isNaN(num1) || isNaN(num2)) {
    console.log("Invalid numbers. Try again.");
    return main();
  }

  let result;
  switch (choice) {
    case "1":
      result = add(num1, num2);
      console.log(`\n${num1} + ${num2} = ${result}`);
      break;
    case "2":
      result = subtract(num1, num2);
      console.log(`\n${num1} - ${num2} = ${result}`);
      break;
    case "3":
      result = multiply(num1, num2);
      console.log(`\n${num1} * ${num2} = ${result}`);
      break;
  }

  return main();
}

main();
