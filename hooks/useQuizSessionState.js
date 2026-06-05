import { useCallback, useState } from "react";

export function getInitialQuizSessionState() {
  return {
    currentQuestionIndex: 0,
    isSubmitted: false,
    selectedOptionIndex: null,
    submittedAnswers: []
  };
}

export function useQuizSessionState() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const applyQuizSessionState = useCallback((nextState = getInitialQuizSessionState()) => {
    setCurrentQuestionIndex(nextState.currentQuestionIndex);
    setSelectedOptionIndex(nextState.selectedOptionIndex);
    setSubmittedAnswers(nextState.submittedAnswers);
    setIsSubmitted(nextState.isSubmitted);
  }, []);

  const resetQuizSessionState = useCallback(() => {
    applyQuizSessionState(getInitialQuizSessionState());
  }, [applyQuizSessionState]);

  return {
    currentQuestionIndex,
    isSubmitted,
    resetQuizSessionState,
    selectedOptionIndex,
    setCurrentQuestionIndex,
    setIsSubmitted,
    setSelectedOptionIndex,
    setSubmittedAnswers,
    submittedAnswers
  };
}
