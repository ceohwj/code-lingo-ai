export function updateSubmittedAnswers(currentAnswers, nextAnswer) {
  if (!Array.isArray(currentAnswers)) {
    return nextAnswer ? [nextAnswer] : [];
  }

  if (!nextAnswer?.questionId) {
    return [...currentAnswers];
  }

  const withoutCurrentAnswer = currentAnswers.filter((answer) => answer?.questionId !== nextAnswer.questionId);
  return [...withoutCurrentAnswer, nextAnswer];
}
