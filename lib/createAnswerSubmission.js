import { checkAnswer, getQuestionDifficulty, getQuestionXp } from "./quizLogic.js";

export function createAnswerMetadata(question, selectedOptionIndex) {
  return {
    questionId: question.id,
    questionDifficulty: getQuestionDifficulty(question),
    selectedOptionIndex,
    isCorrect: checkAnswer(question, selectedOptionIndex)
  };
}

export function createAnswerSubmission({ isReviewMode = false, question, quiz, selectedOptionIndex }) {
  const answerMetadata = createAnswerMetadata(question, selectedOptionIndex);

  return {
    schemaVersion: 1,
    ...answerMetadata,
    xpAwarded: answerMetadata.isCorrect && !isReviewMode
      ? getQuestionXp(question, quiz?.xpByDifficulty)
      : 0
  };
}
