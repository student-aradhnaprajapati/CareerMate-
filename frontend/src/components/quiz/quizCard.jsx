import React, { useState } from 'react';
import { useQuiz } from './quizContext';
// import { connect } from 'react-redux';

const QuestionCard = ({ question, field, subject, difficulty }) => {
  const { setAnswer } = useQuiz();
  const [selectedOption, setSelectedOption] = useState('');
  const [textAnswer, setTextAnswer] = useState('');


  // Handle radio button selection
  const handleOptionChange = (e) => {
    const answer = e.target.value;
    setSelectedOption(answer);
    setAnswer(question.id, answer, field, subject, difficulty); // Save the selected answer in the context
  };
  const handleConfirm = () => {
    setAnswer(question.id, selectedOption || textAnswer, field, subject, difficulty);
    // alert('Answer confirmed!');
    console.log(selectedOption);
  };

  // Clear button handler
  const handleClear = () => {
    setSelectedOption('');
    setTextAnswer('');
    setAnswer(question.id, '', field, subject, difficulty); // Clear the answer in the context
  };
  // Handle text input change
  const handleTextChange = (e) => {
    const answer = e.target.value;
    setTextAnswer(answer);
    setAnswer(question.id, answer, field, subject, difficulty); // Save the typed answer in the context
  };
  // console.log(question?.options?.length);
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Question:</h2>
      <p className="mb-4">{question?.problem_statment}</p>

      {question?.options?.length > 0 ? (
        <div className='bg-green-200 p-2 rounded-2xl'>
          <ul>
            {question?.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${question?.id}`}
                  value={option.option}  // If option is an object with an "option" key
                  checked={selectedOption === option.option}  // Compare with option.option
                  onChange={handleOptionChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span>{option.option}</span>  {/* Display the option */}
              </label>
            ))}

          </ul>
        </div>
      ) : (
        <div>
          <label className="block mb-2">Enter your answer:</label>
          <input
            type="text"
            value={textAnswer}
            onChange={handleTextChange}
            className="border border-gray-300 p-2 rounded w-full"
            placeholder="Type your answer here"
          />
        </div>
      )}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleConfirm}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm"
        >
          Confirm
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          Clear
        </button>
      </div>

    </div>
  );
};

export default QuestionCard;
