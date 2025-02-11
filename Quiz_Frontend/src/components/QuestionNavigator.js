import React, { useContext } from 'react';
import { QuizContext } from './QuizContext';

const QuestionNavigator = ({ setCurrentQuestion }) => {
  const { filteredQuestions } = useContext(QuizContext);

  return (
    <div className="question-navigator">
      {filteredQuestions.map((_, index) => (
        <button
          key={index}
          className="navigator-button"
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionNavigator;
