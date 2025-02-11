import React, { createContext, useContext, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import QuizReport from './quizReport';
import Plot from 'react-plotly.js';

const QuizContext = createContext();
let answered = { "Arts": 0, "Commerce": 0, "PCB": 0, "PCM": 0 };
let total = { "Arts": 0, "Commerce": 0, "PCB": 0, "PCM": 0 };
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };

    case 'SET_FILTERED_QUESTIONS':
      return { ...state, filteredQuestions: action.payload };

    case 'SET_ANSWER': // New case to handle setting answers
      const updatedQuestions = state.questions.map((f) => {

        // console.log(f);
        if (f.field === action.payload.field) {
          console.log(action.payload.field);
          const updatedField = f.subjects.map((s) => {
            if (s.subject === action.payload.subject) {
              console.log(action.payload.subject);
              let qArray = [];
              let value = 0;
              if (action.payload.difficulty === "easy") {
                qArray = s.easy;
                value = 1;
              }
              else if (action.payload.difficulty === "medium") {
                qArray = s.medium;
                value = 2;
              }
              else {
                qArray = s.hard;
                value = 3;
              }

              const updateAns = qArray.map((q) => {
                if (q.id === action.payload.questionId) {
                  console.log(action.payload.questionId);
                  q.answer = action.payload.answer;
                  console.log(q.answer, q.correctAnswer);
                  if (q.correctAnswer[0] === q.answer) {
                    answered[action.payload.field] += 1 * value;
                  }
                  total[action.payload.field] += 1 * value;
                  console.log(answered, total);
                }
                return q;
              });

              if (action.payload.difficulty === "easy") return { ...s, easy: updateAns };
              if (action.payload.difficulty === "medium") return { ...s, medium: updateAns };
              else return { ...s, hard: updateAns };
            }
            return s
          });

          return { ...f, subjects: updatedField }

          // return { ...q, answer: action.payload.answer };
        }
        return f;
      });
      console.log(updatedQuestions);
      return { ...state, questions: updatedQuestions };



    default:
      return state;
  }
};


export const QuizProvider = ({ children }) => {
  // const navigate = useNavigate();
  const initialState = {
    questions: [], // Stores all the questions
    filteredQuestions: [], // Stores filtered questions (if any)
  };

  let pred_field = [];
  let pred_interest = [];
  let result_field = [];
  let result_interest = [];
  let data = [];
  let layout = {};

  const [isSubmit, setIsSubmit] = useState(false);

  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Function to set the questions in the state
  const setQuestions = (questions) => {
    dispatch({ type: 'SET_QUESTIONS', payload: questions });
  };

  // Function to set filtered questions (e.g., by difficulty or subject)
  const setFilteredQuestions = (filteredQuestions) => {
    dispatch({ type: 'SET_FILTERED_QUESTIONS', payload: filteredQuestions });
  };

  // Function to set the answer for a specific question
  const setAnswer = (questionId, answer, field, subject, difficulty) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, answer, field, subject, difficulty },
    });
  };

  const giveInfo = async () => {
    try {
      const response = await axios(`http://localhost:5001/api/v1/user/getProfileById`, {
        params: {
          // id: localStorage.getItem('stuId'),
          id: 11
        }
      });
      console.log(response);
      // setStudentDetails(response.data.basicDetails.rows[0]);
      let pp1 = [];
      let pp2 = [];
      for (let i = 0; i < response.data.predictions.rows.length; i++) {
        pp1.push(response.data.predictions.rows[i]['field']);
        pp2.push(response.data.predictions.rows[i]['interest'] * 100);
      }

      pred_field = pp1;
      pred_interest = pp2;
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  }

  const handleSubmit = async () => {

    await giveInfo();
    let others = 0;
    const arts = answered["Arts"] / total["Arts"] * pred_interest[0];
    others += pred_interest[0] - arts;
    console.log(arts, pred_interest[0]);
    const commerce = answered["Commerce"] / total["Commerce"] * pred_interest[1];
    others += pred_interest[1] - commerce;
    console.log(commerce, pred_interest[1]);
    const pcb = answered["PCB"] / total["PCB"] * pred_interest[2];
    others += pred_interest[2] - pcb;
    console.log(pcb, pred_interest[2]);
    const pcm = answered["PCM"] / total["PCM"] * pred_interest[3];
    others += pred_interest[3] - pcm;
    console.log(pcm, pred_interest[3]);
    console.log(others, pred_interest[4]);
    setIsSubmit(true);

    result_field = pred_field;
    result_interest = [arts, commerce, pcb, pcm, others];

    data = [
      {
        x: pred_field, // Categories
        y: pred_interest, // Data for Category A
        name: 'Predicted Interest by ML Model', // Label for Category A
        type: 'bar',
      },
      {
        x: result_field, // Categories
        y: result_interest, // Data for Category B
        name: 'Interest Calculated by Quiz Result', // Label for Category B
        type: 'bar',
      },
    ];

    layout = {
      title: 'Comparison of Predicted vs Calculated Interests',
      barmode: 'group', // Group the bars for comparison
      xaxis: {
        title: 'Field',
      },
      yaxis: {
        title: 'Percentage Interest',
      },
    };


    // navigate("/QuizReport", { state: { result_field: ["Arts", "Commerce", "PCB", "PCM", "Others"], result_interest: [arts, commerce, pcb, pcm, others], pred_field, pred_interest } });
    // <Link to={{pathname: '/QuizReport', state: {result_field: ["Arts", "Commerce", "PCB", "PCM", "Others"], result_interest: [arts, commerce, pcb, pcm, others], pred_field: pred_field, pred_interest: pred_interest }}}>See Report</Link>
    // const result = await response.data.slots.rows;
    // setSlots(result); // Assuming your query result is in rows

    return { pred_field: pred_field, pred_interest: pred_interest, result_field: result_field, result_interest: result_interest };
  };

  return (
    <QuizContext.Provider value={{ state, setQuestions, setFilteredQuestions, setAnswer, handleSubmit }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
