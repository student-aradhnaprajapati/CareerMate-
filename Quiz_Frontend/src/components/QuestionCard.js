import React, { useContext } from 'react';
import { QuizContext } from './QuizContext.js';

const QuestionCard = ({ currentQuestion }) => {
  const { questions, selectedAnswers, setSelectedAnswer } = useContext(QuizContext);
  const question = questions[currentQuestion];

  const handleOptionChange = (option) => {
    setSelectedAnswer(currentQuestion, option);
  };

  return (
    <div className="question-card">
      <h2>{question.text}</h2>
      <ul className="options">
        {question.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={selectedAnswers[currentQuestion] === option}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
