import express from "express"
import { makeQuiz, makeQuizOption, makeQuizz, } from "../controllers/quizController.js";

const router=express.Router();

router.route('/make/:id').get(makeQuizOption);

export default router;
