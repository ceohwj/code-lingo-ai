export function checkAnswer(question, selectedOptionIndex) {
  return question.correctOptionIndex === selectedOptionIndex;
}

export function calculateXp(correctAnswers, xpPerCorrectAnswer) {
  return correctAnswers * xpPerCorrectAnswer;
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
