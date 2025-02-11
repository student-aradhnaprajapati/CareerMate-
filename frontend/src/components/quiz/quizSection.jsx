import React from 'react';
import QuestionCard from './quizCard';

const QuizSection = ({ field }) => {
  return (
    <div>
      <h2 className='bg-slate-400 text-blue-900 rounded-lg p-2'>{field.field}</h2>
      {field.subjects.map((subject) => (
        <div> 
          <h3 className='bg-red-500 text-white w-15 rounded-lg p-2'>{subject.subject}</h3> 
          {/* <h4>Easy Questions</h4> */}
          {subject?.easy?.map((question) => (
            <QuestionCard key={question.id} question={question} field={field.field} subject={subject.subject} difficulty='easy'/>
          ))}
          {/* <h4>Medium Questions</h4> */}
          {subject?.medium?.map((question) => (
            <QuestionCard key={question.id} question={question} field={field.field} subject={subject.subject} difficulty='medium'/>
          ))}
          {/* <h4>Hard Questions</h4> */}
          {subject?.hard?.map((question) => (
            <QuestionCard key={question.id} question={question} field={field.field} subject={subject.subject} difficulty='hard'/>
          ))} 
        </div>
      ))}
    </div>
  );
};

export default QuizSection;
