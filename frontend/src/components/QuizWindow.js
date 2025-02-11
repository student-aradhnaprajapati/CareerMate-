
import React from "react";
import { Link } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import QuestionNavigator from './QuestionNavigator';
import Timer from './Timer';
import { QuizProvider, QuizContext } from './QuizContext';
import Sidebar from './Sidebar';
import { useState, useContext } from 'react';
import Printing from "./Report";
import Plot from 'react-plotly.js'
// import { Link, RouterProvider } from "react-router-dom";

function QuizWindow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { questions, selectedAnswers } = useContext(QuizContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState(questions); // For storing filtered questions
  const [p1, setP1] = useState([]); // State for p1
  const [p2, setP2] = useState([]); // State for p2

  const handleNext = () => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrevious = () => setCurrentQuestion((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    let totalScore = 0;


    // Calculate score
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        totalScore += 1;
      } 
    });
    let per = calculateAccuracyBySubject(); 
    const subjects = [];
    const accuracies = [];

    for (let index = 0; index < per.length; index++) {
      subjects.push(per[index].subject);
      accuracies.push(per[index].accuracy);
    }

    setP1(subjects);  // Update state for p1
    setP2(accuracies);
    console.log(p1);
    console.log(p2);
    setScore(totalScore);
    setIsSubmitted(true);
  };

  // Handle filter change
  const handleFilterChange = (filters) => {
    let filtered = questions;
    console.log("me called!", filters)

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(q => q.type === filters.type);
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(q => q.difficulty === filters.difficulty);
    }

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }
    console.log(filtered)
    setFilteredQuestions(filtered);
    setCurrentQuestion(0); // Reset to the first question of filtered result
    // QuizContext.forceUpdate();
  };

  const calculateAccuracyBySubject = () => {
    const subjectAccuracy = {};

    questions.forEach((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      if (!subjectAccuracy[question.subject]) {
        subjectAccuracy[question.subject] = { correct: 0, total: 0 };
      }

      subjectAccuracy[question.subject].total += 1;
      if (isCorrect) {
        subjectAccuracy[question.subject].correct += 1;
      }
    });

    // Convert to accuracy percentage
    const accuracyData = Object.keys(subjectAccuracy).map(subject => {
      const { correct, total } = subjectAccuracy[subject];
      return {
        subject,
        accuracy: Math.round((correct / total) * 100)
      };
    });
    console.log(accuracyData);
    return accuracyData;
  };

  if (isSubmitted) {
    return (
      <div className="app-container"> 
        <main className="quiz-main" align="center">
          <br></br>
          <h1><b>Quiz Submitted!</b></h1>
          <br></br><br></br><br></br>
          <Printing p1={p1} p2={p2}/>
          <p>Your Score: <b>{score}</b> out of <b>{questions.length}</b></p>
          <p>You answered <b>{selectedAnswers.filter(Boolean).length}</b> out of <b>{questions.length}</b> questions.</p>
          <Link to="/counsellor" className="text-3xl text-red" color="red">
            <br /><br /><br /><br /><br />
            <b style={{ backgroundcolor: 'Green' }}>Go for Counselling</b>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* <Sidebar onFilterChange={handleFilterChange} /> */}
      <main className="quiz-main"> 
        <Timer handleSubmit={handleSubmit} />
        <QuestionCard currentQuestion={currentQuestion} question={filteredQuestions[currentQuestion]} />
        <div className="quiz-controls">
          <button onClick={handlePrevious} className="but">Previous</button>
          <button onClick={handleNext} className="but">Next</button>
        </div>
        <div className="submit-button"><button className="submit" onClick={handleSubmit}>Submit Quiz</button></div>
        <QuestionNavigator setCurrentQuestion={setCurrentQuestion} questions={filteredQuestions} />
      </main>
    </div>
  );
}


export default QuizWindow;