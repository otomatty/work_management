function generateInteger(includeNegatives) {
  const range = 100;
  let number = Math.floor(Math.random() * (range + 1));
  if (includeNegatives) {
    number *= Math.random() < 0.5 ? 1 : -1;
  }
  return number;
}

function generateFraction(includeNegatives) {
  const numerator = generateInteger(includeNegatives);
  const denominator = Math.floor(Math.random() * 8) + 2; // Avoid denominator being 1
  return `${numerator}/${denominator}`;
}

function generateDecimal(includeNegatives) {
  let number = (Math.random() * 10).toFixed(1);
  if (includeNegatives && Math.random() < 0.5) {
    number = "-" + number;
  }
  return number;
}

function generateRandomNumber(selectedFormats, includeNegatives) {
  const format =
    selectedFormats[Math.floor(Math.random() * selectedFormats.length)];
  switch (format) {
    case "整数":
      return generateInteger(includeNegatives);
    case "分数":
      return generateFraction(includeNegatives);
    case "少数":
      return generateDecimal(includeNegatives);
    default:
      return generateInteger(includeNegatives);
  }
}

function generateProblem(
  selectedTypes,
  selectedFormats,
  terms,
  includeNegatives
) {
  const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];

  let problem = "";
  let numbers = [];

  for (let i = 0; i < terms; i++) {
    numbers.push(generateRandomNumber(selectedFormats, includeNegatives));
  }

  switch (type) {
    case "addition":
      problem = numbers.join(" + ");
      break;
    case "subtraction":
      problem = numbers.join(" - ");
      break;
    case "multiplication":
      problem = numbers.join(" × ");
      break;
    case "division":
      problem = numbers.join(" ÷ ");
      break;
    default:
      //   console.log("Unknown problem type:", type);
      problem = "Unknown problem type";
  }

  //   console.log("Generated problem:", problem); // Log the generated problem for debugging

  return problem + " = ";
}

function generateProblems(
  selectedTypes,
  selectedFormats,
  terms,
  count,
  includeNegatives,
  pageCount = 1 // ページ数パラメータを追加
) {
  const problemsPerPage = count; // 1ページあたりの問題数
  const totalProblems = problemsPerPage * pageCount; // 総問題数を計算
  const problems = [];
  for (let i = 0; i < totalProblems; i++) {
    const problem = generateProblem(
      selectedTypes,
      selectedFormats,
      terms,
      includeNegatives
    );
    problems.push(problem);
  }
  return problems;
}

export { generateProblems };
