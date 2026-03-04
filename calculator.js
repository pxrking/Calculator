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

function sin(a) {
  return Math.sin((a * Math.PI) / 180);
}

function cos(a) {
  return Math.cos((a * Math.PI) / 180);
}

function tan(a) {
  return Math.tan((a * Math.PI) / 180);
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
  console.log("6. Sin");
  console.log("7. Cos");
  console.log("8. Tan");
  console.log("9. Exit\n");

  const choice = await prompt("Choose an operation (1-9): ");

  if (choice === "9") {
    console.log("Goodbye!");
    rl.close();
    return;
  }

  if (!["1", "2", "3", "4", "5", "6", "7", "8"].includes(choice)) {
    console.log("Invalid choice. Try again.");
    return main();
  }

  if (["6", "7", "8"].includes(choice)) {
    const angle = parseFloat(await prompt("Enter angle in degrees: "));
    if (isNaN(angle)) {
      console.log("Invalid number. Try again.");
      return main();
    }
    let result;
    let funcName;
    if (choice === "6") {
      result = sin(angle);
      funcName = "sin";
    } else if (choice === "7") {
      result = cos(angle);
      funcName = "cos";
    } else {
      result = tan(angle);
      funcName = "tan";
    }
    console.log(`\n${funcName}(${angle}°) = ${result}`);
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
