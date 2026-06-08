import aiBasicsQuiz from "./questions/ai.json" with { type: "json" };
import bioinformaticsBasicsQuiz from "./questions/bioinformatics.json" with { type: "json" };
import numpyBasicsQuiz from "./questions/numpy.json" with { type: "json" };
import pandasBasicsQuiz from "./questions/pandas.json" with { type: "json" };
import pythonBasicsQuiz from "./questions/python.json" with { type: "json" };
import sqlBasicsQuiz from "./questions/sql.json" with { type: "json" };

export { aiBasicsQuiz, bioinformaticsBasicsQuiz, numpyBasicsQuiz, pandasBasicsQuiz, pythonBasicsQuiz, sqlBasicsQuiz };

export const quizzes = [pythonBasicsQuiz, sqlBasicsQuiz, pandasBasicsQuiz, numpyBasicsQuiz, aiBasicsQuiz, bioinformaticsBasicsQuiz];
