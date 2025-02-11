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
      <h1 className="stitle">CareerMate</h1>
      <h3 className="stag">Enlightening Futures, Nurturing Success</h3>
      <br /><br /><br />
      {/* <h1 className="side">Filter Questions</h1>
    <br />
      <div className="filter-section">
        <label className="filhead">Type:</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="">All</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
    <br />
      <div className="filter-section">
        <label className="filhead">Difficulty:</label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="">All</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
    <br />
      <div className="filter-section">
        <label className="filhead">Subject:</label>
        <select value={subject} onChange={handleSubjectChange}>
          <option value="">All</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div> */}
    </div>
  );
};

export default Sidebar;
