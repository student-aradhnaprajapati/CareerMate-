import React, { useState } from 'react';
import { useQuiz } from './quizContext.jsx';
import QuizSection from './quizSection.jsx';
import { useNavigate } from 'react-router-dom';
// import QuizFilters from './quizFilters.jsx';

const QuizWindow = () => {
  const navigate = useNavigate();
  const { state, handleSubmit } = useQuiz();
  const submit = async () => {
    const report = await handleSubmit();
    console.log(report);

    navigate("/QuizReport", {state: {result_field: report.result_field, result_interest: report.result_interest, pred_field: report.pred_field, pred_interest: report.pred_interest}});
    
    // console.log(resp.pred_field);
    // console.log(resp.pred_interest);
    // console.log(resp.result_field);
    // console.log(resp.result_interest);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Quiz Window Title */}
      <h1 className="text-4xl font-bold text-yellow-800 bg-slate-300 py-2 px-4 rounded-lg shadow-md mb-8">
        Quiz Window
      </h1>

      {/* Quiz Sections */}
      {state.questions?.map((field, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg border border-gray-300 p-6 mb-6 w-full max-w-3xl"
        >
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {field.field} 
            </h2> */}
          <QuizSection field={field} />
        </div>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default QuizWindow;
