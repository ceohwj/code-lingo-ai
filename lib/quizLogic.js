export const SUPPORTED_DIFFICULTIES = ["easy", "medium", "hard"];

export const DEFAULT_XP_BY_DIFFICULTY = {
  easy: 10,
  medium: 15,
  hard: 25
};

export function checkAnswer(question, selectedOptionIndex) {
  return question.correctOptionIndex === selectedOptionIndex;
}

export function getQuestionDifficulty(question) {
  return SUPPORTED_DIFFICULTIES.includes(question?.difficulty) ? question.difficulty : "easy";
}

export function getQuestionXp(question, xpByDifficulty = DEFAULT_XP_BY_DIFFICULTY) {
  return xpByDifficulty[getQuestionDifficulty(question)] ?? DEFAULT_XP_BY_DIFFICULTY.easy;
}

export function getQuestionHint(question) {
  if (typeof question?.hint !== "string") {
    return "";
  }

  return question.hint.trim();
}

export function getDifficultyLabel(difficulty) {
  const normalizedDifficulty = SUPPORTED_DIFFICULTIES.includes(difficulty) ? difficulty : "easy";
  return normalizedDifficulty.charAt(0).toUpperCase() + normalizedDifficulty.slice(1);
}

export function calculateXp(correctAnswers, xpPerCorrectAnswer) {
  return correctAnswers * xpPerCorrectAnswer;
}

export function calculateDifficultyXp(answers, questions, xpByDifficulty = DEFAULT_XP_BY_DIFFICULTY) {
  const questionById = new Map(questions.map((question) => [question.id, question]));

  return answers.reduce((totalXp, answer) => {
    if (!answer.isCorrect) {
      return totalXp;
    }

    const question = questionById.get(answer.questionId);
    return totalXp + (answer.xpAwarded ?? getQuestionXp(question, xpByDifficulty));
  }, 0);
}

export function getProgressPercent(answeredCount, totalCount) {
  if (totalCount <= 0) {
    return 0;
  }

  return Math.round((answeredCount / totalCount) * 100);
}

export function getFeedback(isCorrect) {
  return isCorrect
    ? "Nice. That answer is locked in."
    : "Not quite. Read the explanation and keep moving.";
}
