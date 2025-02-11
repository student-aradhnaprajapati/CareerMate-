import React, { useEffect } from 'react';
import { useQuiz } from './quizContext';
import axios from 'axios';

const QuizProviderComponent = ({ children }) => {
  const { state,setQuestions } = useQuiz();
    const id=localStorage.getItem('stuId');

  useEffect(() => {
    const fetchQuestions = async () => { 
      const res = await axios.get(`http://localhost:5001/api/v1/quiz/make/${id}`);
      console.log(res.data.questions);
      console.log(res);
      setQuestions(res.data.questions);
    }; 
    fetchQuestions(); 
  }, [id]);

  
  return <>{children}</>;
};

export default QuizProviderComponent;
