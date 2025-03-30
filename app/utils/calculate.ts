function singleCalculation(a: number, b: number, operator: string): number {
	switch (operator) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "/":
			if (b === 0) {
				throw new Error("Division by zero");
			}

			return a / b;
		case "^":
			return Math.pow(a, b);
		default:
			throw new Error(`Unknown operator: ${operator}`);
	}
}

function calculateAllOperation(numbers: number[], operations: string[], operation: string) {
	const operationIndices = operations
		.map((op, index) => (op === operation ? index : -1))
		.filter((index) => index !== -1)
		.reverse();

	for (let index of operationIndices) {
		const result = singleCalculation(numbers[index], numbers[index + 1], operation);
		numbers.splice(index, 2, result);
		operations.splice(index, 1);
	}
}

export default function calculate(equation: string) {
  const cleanEquation = equation
      .replaceAll(" ", "")
      .replaceAll(/([0-9])-/g, "$1+-");

	let operations = [...cleanEquation.matchAll(/[+*\/^]/g)].map((match) => match[0]);
	let numbers = cleanEquation.split(/[+*\/^]/g).map((num) => Number(num));

	calculateAllOperation(numbers, operations, "^");
	calculateAllOperation(numbers, operations, "*");
	calculateAllOperation(numbers, operations, "/");
	calculateAllOperation(numbers, operations, "+");
	// calculateAllOperation(numbers, operations, "-");

	return numbers[0];
}

console.log(calculate("-2 + 3.2 * -4 - 5 / -6 ^ 7"));
