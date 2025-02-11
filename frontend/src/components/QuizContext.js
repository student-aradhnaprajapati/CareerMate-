import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a QuizContext
const QuizContext = createContext();

const fetchQuestions = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5001/api/v1/quiz/make/${id}`);
    // Assuming response contains `questions` as described in the structure
    console.log(res.data.questions);
    return res.data.questions;
  } catch (error) {
    console.error("Error fetching quiz data", error);
    return [];
  }
};

const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]); // State to hold questions
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // State for selected answers
  
  const id = 5; // Hardcoded ID, this can be dynamic

  // Fetch questions on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      const questionData = await fetchQuestions(id);
      
      // Flatten the structure to extract easy, medium, hard questions
      const flatQuestions = questionData.reduce((acc, fieldObj) => {
        const subjectQuestions = fieldObj.subjects.flatMap(subjectObj => {
          const allDifficulties = [
            ...subjectObj.easy,
            ...subjectObj.medium,
            ...subjectObj.hard
          ];
          return allDifficulties.map(q => ({
            ...q, 
            subject: subjectObj.subject // Add subject to each question
          }));
        });
        return [...acc, ...subjectQuestions];
      }, []);
      
      setQuestions(flatQuestions); // Populate questions
      setFilteredQuestions(flatQuestions); // Initial filtered questions
      setSelectedAnswers(Array(flatQuestions.length).fill(null)); // Set default selected answers
    };

    loadQuestions();
  }, [id]); // Re-run when the ID changes

  // Function to update selected answers
  const setSelectedAnswer = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  // Filter questions based on selected criteria
  const filterQuestions = (filters) => {
    let filtered = questions;

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

    // Update the filteredQuestions state
    setFilteredQuestions(filtered);
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

  return (
    <QuizContext.Provider value={{
      questions,
      filteredQuestions, // Provide filtered questions
      selectedAnswers,
      setSelectedAnswer,
      filterQuestions,
      calculateAccuracyBySubject // Provide the filterQuestions function
    }}> 
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
