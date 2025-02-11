import React, { useContext, useState } from 'react';
import { QuizContext } from './QuizContext';

const Sidebar = ({ onFilterChange }) => {
  const { questions } = useContext(QuizContext);

  // States for filters
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [subject, setSubject] = useState('');

  // Unique dropdown values
  const types = [...new Set(questions.map(q => q.type))];
  const difficulties = [...new Set(questions.map(q => q.difficulty))];
  const subjects = [...new Set(questions.map(q => q.subject))];

  // Trigger filtering when dropdown values change
  const handleTypeChange = (e) => {
    setType(e.target.value);
    onFilterChange({ type: e.target.value, difficulty, subject });
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    onFilterChange({ type, difficulty: e.target.value, subject });
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    onFilterChange({ type, difficulty, subject: e.target.value });
  };

  return (
    <div className="sidebar">
      <h2>Filter Questions</h2>

      <div className="filter-section">
        <label>Type:</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="">All</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="filter-section">
        <label>Difficulty:</label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="">All</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="filter-section">
        <label>Subject:</label>
        <select value={subject} onChange={handleSubjectChange}>
          <option value="">All</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
