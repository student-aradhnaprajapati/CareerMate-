import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice.js';
const store = configureStore({
    reducer: {
        user: userReducer,
        departments: deptReducer,
    },
});

export default store;
