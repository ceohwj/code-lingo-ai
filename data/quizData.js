import aiBasicsQuiz from "./questions/ai.json" with { type: "json" };
import bioinformaticsBasicsQuiz from "./questions/bioinformatics.json" with { type: "json" };
import pythonBasicsQuiz from "./questions/python.json" with { type: "json" };
import sqlBasicsQuiz from "./questions/sql.json" with { type: "json" };

export { aiBasicsQuiz, bioinformaticsBasicsQuiz, pythonBasicsQuiz, sqlBasicsQuiz };

export const quizzes = [pythonBasicsQuiz, sqlBasicsQuiz, aiBasicsQuiz, bioinformaticsBasicsQuiz];
