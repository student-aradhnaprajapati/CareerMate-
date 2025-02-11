import React, { useState } from 'react';
import { useQuiz } from './quizContext';

const QuizFilters = () => {
  const { state, setFilteredQuestions } = useQuiz();
  const [difficulty, setDifficulty] = useState('');

  const handleFilterChange = (e) => {
    setDifficulty(e.target.value);
    filterQuestions(e.target.value);
  };

  const filterQuestions = (difficulty) => {
    if (!difficulty) {
      setFilteredQuestions(state.questions);
    } else {
      const filtered = state.questions.map((field) => ({
        ...field,
        subjects: field.subjects.map((subject) => ({
          ...subject,
          easy: difficulty === 'Easy' ? subject.easy : [],
          medium: difficulty === 'Medium' ? subject.medium : [],
          hard: difficulty === 'Hard' ? subject.hard : [],
        })),
      }));
      setFilteredQuestions(filtered);
    }
  };

  return (
    <div>
      <label>Filter by Difficulty: </label>
      <select value={difficulty} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
};

export default QuizFilters;
