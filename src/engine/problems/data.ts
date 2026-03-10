import type { Problem, ProblemGenerator, ScaffoldingLevel, QuestionPart } from '../../types';
import { randomInt, generateId, shuffle, makeChoices } from './utils';

interface DataCategory {
  theme: string;
  categories: string[];
}

const DATA_THEMES: DataCategory[] = [
  { theme: 'favorite fruit', categories: ['apples', 'bananas', 'oranges'] },
  { theme: 'favorite color', categories: ['red', 'blue', 'green'] },
  { theme: 'favorite pet', categories: ['dog', 'cat', 'fish'] },
  { theme: 'favorite season', categories: ['spring', 'summer', 'winter'] },
  { theme: 'favorite sport', categories: ['soccer', 'basketball', 'swimming'] },
  { theme: 'favorite snack', categories: ['cookies', 'crackers', 'fruit'] },
];

function generateDataSet(categories: string[]): Record<string, number> {
  // Generate unique values so there are no ties for most/least
  const values: number[] = [];
  const available = [1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < categories.length; i++) {
    const idx = randomInt(0, available.length - 1);
    values.push(available[idx]);
    available.splice(idx, 1);
  }
  const data: Record<string, number> = {};
  for (let i = 0; i < categories.length; i++) {
    data[categories[i]] = values[i];
  }
  return data;
}

function tallies(n: number): string {
  const fullGroups = Math.floor(n / 5);
  const remainder = n % 5;
  let result = '';
  for (let i = 0; i < fullGroups; i++) {
    result += '||||̸ '; // tally group of 5
  }
  result += '|'.repeat(remainder);
  return result.trim();
}

function barChart(data: Record<string, number>): string {
  const lines: string[] = [];
  for (const [category, count] of Object.entries(data)) {
    lines.push(`${category}: ${'█'.repeat(count)} (${count})`);
  }
  return lines.join('\n');
}

// ============================================
// Organize Data into Categories
// ============================================
const organizeDataCategories: ProblemGenerator = {
  skillId: 'organize-data-categories',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const themeData = DATA_THEMES[randomInt(0, DATA_THEMES.length - 1)];
    const data = generateDataSet(themeData.categories);

    // Ask how many in a specific category
    const askCategory = themeData.categories[randomInt(0, themeData.categories.length - 1)];
    const answer = data[askCategory];

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;

    switch (scaffolding) {
      case 'concrete': {
        const tallyDisplay = themeData.categories
          .map(cat => `${cat}: ${tallies(data[cat])}`)
          .join('\n');
        question = `Kids voted for their ${themeData.theme}. Here are the tallies:\n${tallyDisplay}\n\nHow many picked ${askCategory}?`;
        questionParts = [
          { type: 'text', value: `${themeData.theme} votes:` },
          ...themeData.categories.map(cat => ({
            type: 'text' as const,
            value: `${cat}: ${tallies(data[cat])}`,
          })),
          { type: 'text', value: `How many picked ${askCategory}?` },
        ];
        hint = `Count the tally marks next to ${askCategory}. Remember, each group of 5 looks like ||||̸.`;
        break;
      }
      case 'representational': {
        const chart = barChart(data);
        question = `Look at the chart for ${themeData.theme}:\n${chart}\n\nHow many picked ${askCategory}?`;
        questionParts = [
          { type: 'text', value: `${themeData.theme} chart:` },
          ...themeData.categories.map(cat => ({
            type: 'text' as const,
            value: `${cat}: ${'█'.repeat(data[cat])} (${data[cat]})`,
          })),
          { type: 'text', value: `How many picked ${askCategory}?` },
        ];
        hint = `Look at the bar for ${askCategory}. How long is it?`;
        break;
      }
      case 'abstract': {
        const dataDisplay = themeData.categories
          .map(cat => `${cat}: ${data[cat]}`)
          .join(', ');
        question = `Survey results for ${themeData.theme}: ${dataDisplay}. How many picked ${askCategory}?`;
        questionParts = [
          { type: 'text', value: `${themeData.theme}: ${dataDisplay}` },
          { type: 'text', value: `How many picked ${askCategory}?` },
        ];
        hint = `Find ${askCategory} in the data.`;
        break;
      }
    }

    return {
      id: generateId(),
      skillId: 'organize-data-categories',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer: answer.toString(),
      choices: makeChoices(answer, 1, 10),
      hint,
      explanation: `${answer} kids picked ${askCategory} as their ${themeData.theme}. You can count the tally marks or read the chart to find the answer.`,
    };
  },
};

// ============================================
// Interpret Data
// ============================================
const interpretData: ProblemGenerator = {
  skillId: 'interpret-data',
  generate(scaffolding: ScaffoldingLevel): Problem {
    const themeData = DATA_THEMES[randomInt(0, DATA_THEMES.length - 1)];
    const data = generateDataSet(themeData.categories);

    // Different types of interpretation questions
    type QuestionType = 'most' | 'least' | 'how-many-more' | 'total';
    const questionTypes: QuestionType[] = ['most', 'least', 'how-many-more', 'total'];
    const qType: QuestionType = questionTypes[randomInt(0, questionTypes.length - 1)];

    const entries = Object.entries(data);
    const sorted = [...entries].sort((a, b) => a[1] - b[1]);
    const least = sorted[0];
    const most = sorted[sorted.length - 1];
    const total = entries.reduce((sum, [, v]) => sum + v, 0);

    let question: string;
    let questionParts: QuestionPart[] | undefined;
    let hint: string | undefined;
    let correctAnswer: string;

    const chartDisplay = themeData.categories
      .map(cat => `${cat}: ${'█'.repeat(data[cat])} (${data[cat]})`)
      .join('\n');

    switch (qType) {
      case 'most':
        correctAnswer = most[0];
        break;
      case 'least':
        correctAnswer = least[0];
        break;
      case 'how-many-more':
        correctAnswer = (most[1] - least[1]).toString();
        break;
      case 'total':
        correctAnswer = total.toString();
        break;
      default:
        correctAnswer = most[0];
    }

    const questionText = {
      most: `Which ${themeData.theme} got the most votes?`,
      least: `Which ${themeData.theme} got the fewest votes?`,
      'how-many-more': `How many more votes did ${most[0]} get than ${least[0]}?`,
      total: `How many votes were there in all?`,
    };

    switch (scaffolding) {
      case 'concrete':
        question = `Look at the chart for ${themeData.theme}:\n${chartDisplay}\n\n${questionText[qType]}`;
        questionParts = [
          { type: 'text', value: `${themeData.theme} chart:` },
          ...themeData.categories.map(cat => ({
            type: 'text' as const,
            value: `${cat}: ${'█'.repeat(data[cat])} (${data[cat]})`,
          })),
          { type: 'text', value: questionText[qType] },
        ];
        if (qType === 'most' || qType === 'least') {
          hint = `Compare the bars. Which one is the ${qType === 'most' ? 'longest' : 'shortest'}?`;
        } else if (qType === 'how-many-more') {
          hint = `Count the difference between the ${most[0]} bar and the ${least[0]} bar.`;
        } else {
          hint = `Add up all the numbers together.`;
        }
        break;
      case 'representational':
        question = `${themeData.theme} data:\n${chartDisplay}\n\n${questionText[qType]}`;
        questionParts = [
          { type: 'text', value: `${themeData.theme}:` },
          ...themeData.categories.map(cat => ({
            type: 'text' as const,
            value: `${cat}: ${data[cat]}`,
          })),
          { type: 'text', value: questionText[qType] },
        ];
        if (qType === 'most' || qType === 'least') {
          hint = `Compare the numbers. Which is ${qType === 'most' ? 'biggest' : 'smallest'}?`;
        } else if (qType === 'how-many-more') {
          hint = `Subtract: ${most[1]} - ${least[1]} = ?`;
        } else {
          hint = `Add all the numbers: ${entries.map(([, v]) => v).join(' + ')} = ?`;
        }
        break;
      case 'abstract': {
        const dataStr = themeData.categories.map(cat => `${cat}: ${data[cat]}`).join(', ');
        question = `${themeData.theme} results: ${dataStr}. ${questionText[qType]}`;
        questionParts = [
          { type: 'text', value: `${dataStr}` },
          { type: 'text', value: questionText[qType] },
        ];
        hint = qType === 'total'
          ? `Add all the values.`
          : qType === 'how-many-more'
            ? `Find the difference.`
            : `Compare the numbers.`;
        break;
      }
    }

    let choices: string[];
    if (qType === 'most' || qType === 'least') {
      choices = shuffle(themeData.categories);
    } else if (qType === 'how-many-more') {
      const diff = most[1] - least[1];
      choices = makeChoices(diff, 0, 10);
    } else {
      choices = makeChoices(total, Math.max(1, total - 5), total + 5);
    }

    let explanation: string;
    switch (qType) {
      case 'most':
        explanation = `${most[0]} got the most votes with ${most[1]}. Compare: ${entries.map(([name, count]) => `${name} = ${count}`).join(', ')}.`;
        break;
      case 'least':
        explanation = `${least[0]} got the fewest votes with ${least[1]}. Compare: ${entries.map(([name, count]) => `${name} = ${count}`).join(', ')}.`;
        break;
      case 'how-many-more':
        explanation = `${most[0]} has ${most[1]} votes and ${least[0]} has ${least[1]} votes. ${most[1]} - ${least[1]} = ${most[1] - least[1]} more.`;
        break;
      case 'total':
        explanation = `Add all the votes: ${entries.map(([, v]) => v).join(' + ')} = ${total} votes in all.`;
        break;
      default:
        explanation = '';
    }

    return {
      id: generateId(),
      skillId: 'interpret-data',
      type: 'multiple_choice',
      scaffolding,
      question,
      questionParts,
      correctAnswer,
      choices,
      hint,
      explanation,
    };
  },
};

export const dataGenerators: ProblemGenerator[] = [
  organizeDataCategories,
  interpretData,
];
