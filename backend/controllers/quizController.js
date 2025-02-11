import pool from "../config/localdb.js";



export const addReport = async (req, res) => {

};

export const makeQuiz = async (req, res) => {
    try {
        const { stud_id } = req.body;

        // Fetch interests from the database
        const interestQuery = `SELECT field, interest FROM predicted_interest WHERE id = ${stud_id}`;
        let interestResults = await pool.query(interestQuery);

        interestResults = interestResults.rows;
        // Extract fields and corresponding interest (probability) values
        const interests = interestResults.map(row => ({ field: row.field, interest: row.interest }));

        console.log(interests);
        // Question types per field (can add more subjects as needed)
        const questionTypes = {
            'Arts': ['History', 'Sociology', 'Psychology', 'Geography', 'Political Science'],
            'Commerce': ['Economics', 'Accountancy', 'Business Studies', 'Basic Commercial Knowledge', 'Mathematics'],
            'PCB': ['Physics', 'Chemistry', 'Biology'],
            'PCM': ['Physics', 'Chemistry', 'Maths']
        };

        // To hold the required number of questions for each field
        const setOfQuestions = [];

        // Fetch the total number of available questions for each difficulty level for each field
        for (const { field, interest } of interests) {
            if (!questionTypes[field]) continue; // If the field is not defined in questionTypes, skip it

            const totalQuestionsQuery = `
                SELECT difficulty, COUNT(*) as count 
                FROM Question 
                WHERE subject IN (${questionTypes[field].map(subject => `'${subject}'`).join(', ')})
                GROUP BY difficulty; 
            `;
           
            let questionCounts = await pool.query(totalQuestionsQuery);
            questionCounts = questionCounts.rows;
            console.log(questionCounts);

            // Create a map of difficulty to total available questions
            const totalQuestionsByDifficulty = {};
            questionCounts?.forEach(row => {
                totalQuestionsByDifficulty[row.difficulty] = row.count;
            });
            console.log("modify", questionCounts);

            // Calculate required questions based on the interest (probability) and difficulty
            const totalFieldQuestions = Math.floor(interest * 30); // Assuming a total of 30 questions per field based on interest

            /*          // Proportional reduction for difficulties: easy > medium > hard
                      const easyQCount = Math.floor(0.5 * totalFieldQuestions);
                      const mediumQCount = Math.floor(0.3 * totalFieldQuestions);
                      const hardQCount = totalFieldQuestions - easyQCount - mediumQCount; // Remaining goes to hard questions
          
                      // Fetch required questions for each difficulty
                      const easyQuery = `
                          SELECT id, problem_statement FROM Question 
                          WHERE difficulty = 'Easy' 
                          AND subject IN (${questionTypes[field].map(subject => `'${subject}'`).join(', ')}) 
                          ORDER BY RANDOM() 
                          LIMIT ?;
                      `;
                      const mediumQuery = `
                          SELECT id, problem_statement FROM Question 
                          WHERE difficulty = 'Medium' 
                          AND subject IN (${questionTypes[field].map(subject => `'${subject}'`).join(', ')}) 
                          ORDER BY RANDOM() 
                          LIMIT ?;
                      `;
                      const hardQuery = `
                          SELECT id, problem_statement FROM Question 
                          WHERE difficulty = 'Hard' 
                          AND subject IN (${questionTypes[field].map(subject => `'${subject}'`).join(', ')}) 
                          ORDER BY RANDOM() 
                          LIMIT ?;
                      `;
          
                      // Execute the queries with calculated question counts based on interest
                      const [easyQuestions] = await pool.query(easyQuery, [Math.min(easyQCount, totalQuestionsByDifficulty['Easy'] || 0)]);
                      const [mediumQuestions] = await pool.query(mediumQuery, [Math.min(mediumQCount, totalQuestionsByDifficulty['Medium'] || 0)]);
                      const [hardQuestions] = await pool.query(hardQuery, [Math.min(hardQCount, totalQuestionsByDifficulty['Hard'] || 0)]);
          
                      // Collect questions for this field
                      setOfQuestions.push({
                          field,
                          easy: easyQuestions,
                          medium: mediumQuestions,
                          hard: hardQuestions
                      });
                  }*/
        }
        // Send back the result as a response
        res.json({ success: true });// questions: setOfQuestions });

    } catch (error) {
        console.error('Error while generating quiz:', error);
        res.status(500).json({ success: false, message: 'An error occurred while generating the quiz.' });
    }
};

export const makeQuizz = async (req, res) => {
    try {
        const stud_id  =req.params.id;
        console.log("hi",   stud_id);
        // Fetch interests from the database
        const interestQuery = `SELECT field, interest FROM predicted_interest WHERE id = ${stud_id}`;
        let interestResults = await pool.query(interestQuery);

        interestResults = interestResults.rows;

        // Extract fields and corresponding interest (probability) values
        const interests = interestResults.map(row => ({ field: row.field, interest: row.interest }));
        console.log(interests);

        // Question types per field
        const questionTypes = {
            'Arts': ['History', 'Sociology', 'Psychology', 'Geography', 'Political Science'],
            'Commerce': ['Economics', 'Accountancy', 'Business Studies', 'Basic Commercial Knowledge', 'Mathematics'],
            'PCB': ['Physics', 'Chemistry', 'Biology'],
            'PCM': ['Physics', 'Chemistry', 'Maths']
        };

        // To hold the required number of questions for each field
        const setOfQuestions = [];

        // Loop through interests to fetch question data for each field and difficulty
        for (const { field, interest } of interests) {
            if (!questionTypes[field]){
                console.log("skipping",field);
                continue; 

            } // If the field is not defined in questionTypes, skip it

            const fieldData = {
                field: field,
                subjects: []
            };

            // Loop through each subject in the field and get questions based on difficulty
            for (const subject of questionTypes[field]) {
                const subjectData = {
                    subject,
                    easy: [],
                    medium: [],
                    hard: []
                };

                // Fetch the total number of available questions for each difficulty level for this subject
                const totalQuestionsQuery = `
                    SELECT difficulty, COUNT(*) as count 
                    FROM Question 
                    WHERE subject = '${subject}'
                    GROUP BY difficulty;
                `;
                const totalQuestions = await pool.query(totalQuestionsQuery);
                
                console.log(totalQuestions);

                const totalQuestionsByDifficulty = totalQuestions.rows.reduce((acc, row) => {
                    acc[row.difficulty] = row.count;
                    return acc; 
                }, { 'Easy': 0, 'Medium': 0, 'Hard': 0 });

                console.log(totalQuestionsByDifficulty)
                // Calculate how many questions to fetch for each difficulty
                const totalFieldQuestions = Math.floor((totalQuestionsByDifficulty['Easy'] + totalQuestionsByDifficulty['Medium'] + totalQuestionsByDifficulty['Hard']));

                // Determine how to split totalFieldQuestions into easy, medium, and hard
                const easyQCount = Math.min(Math.floor(0.5 * interest * totalFieldQuestions), totalQuestionsByDifficulty['Easy']);
                const mediumQCount = Math.min(Math.floor(0.3 * interest * totalFieldQuestions), totalQuestionsByDifficulty['Medium']);
                const hardQCount = Math.min(0.1 * interest * (totalFieldQuestions - totalQuestionsByDifficulty['Easy'] - totalQuestionsByDifficulty['Medium']), totalQuestionsByDifficulty['Hard']);

                // Fetch Easy questions
                const easyQuery = `
                    SELECT id, problem_statment ,difficulty
                    FROM Question 
                    WHERE subject = '${subject}' 
                    AND difficulty = 'Easy'
                    ORDER BY RANDOM()
                    LIMIT ${easyQCount};
                `;
                const easyQuestions = await pool.query(easyQuery);
                subjectData.easy = easyQuestions.rows;

                // Fetch Medium questions
                const mediumQuery = `
                    SELECT id, problem_statment,difficulty 
                    FROM Question 
                    WHERE subject = '${subject}' 
                    AND difficulty = 'Medium'
                    ORDER BY RANDOM()
                    LIMIT ${mediumQCount};
                `;
                const mediumQuestions = await pool.query(mediumQuery);
                subjectData.medium = mediumQuestions.rows;

                // Fetch Hard questions
                const hardQuery = `
                    SELECT id, problem_statment,difficulty 
                    FROM Question 
                    WHERE subject = '${subject}' 
                    AND difficulty = 'Hard'
                    ORDER BY RANDOM()
                    LIMIT ${hardQCount};
                `;
                const hardQuestions = await pool.query(hardQuery);
                subjectData.hard = hardQuestions.rows;

                // Push subject data into field data
                fieldData.subjects.push(subjectData);
            } 
            console.log("################################one iteration done################################")
            // Push field data (with subjects and their questions) to the overall set of questions
            setOfQuestions.push(fieldData);
        }
        // Send back the result as a response
        res.json({ success: true, questions: setOfQuestions });

    } catch (error) {
        console.error('Error while generating quiz:', error);
        res.status(500).json({ success: false, message: 'An error occurred while generating the quiz.' });
    }
};

export const makeQuizOption = async (req, res) => {
    try {
        const stud_id = req.params.id;

        const interestQuery = `SELECT field, interest FROM predicted_interest WHERE id = ${stud_id}`;
        let interestResults = await pool.query(interestQuery);
        interestResults = interestResults.rows;

        const interests = interestResults.map(row => ({ field: row.field, interest: row.interest }));
        console.log(interests);

        const questionTypes = {
            'Arts': ['History', 'Sociology', 'Psychology', 'Geography', 'Political Science'],
            'Commerce': ['Economics', 'Accountancy', 'Business Studies', 'Basic Commercial Knowledge', 'Mathematics'],
            'PCB': ['Physics', 'Chemistry', 'Biology'],
            'PCM': ['Physics', 'Chemistry', 'Maths']
        };

        const setOfQuestions = [];

        for (const { field, interest } of interests) {
            if (!questionTypes[field]) {
                console.log("Skipping field:", field);
                continue;
            }

            const fieldData = {
                field: field,
                subjects: []
            };

            for (const subject of questionTypes[field]) {
                const subjectData = {
                    subject,
                    easy: [],
                    medium: [],
                    hard: []
                };

                const totalQuestionsQuery = `
                    SELECT difficulty, COUNT(*)/5 as count 
                    FROM Question 
                    WHERE subject = '${subject}'
                    GROUP BY difficulty;
                `;
                const totalQuestions = await pool.query(totalQuestionsQuery);
                const totalQuestionsByDifficulty = totalQuestions.rows.reduce((acc, row) => {
                    acc[row.difficulty] = row.count;
                    return acc;
                }, { 'Easy': 0, 'Medium': 0, 'Hard': 0 });

                const totalFieldQuestions = Math.floor((totalQuestionsByDifficulty['Easy'] + totalQuestionsByDifficulty['Medium'] + totalQuestionsByDifficulty['Hard']));
                const easyQCount = Math.min(Math.floor(0.5 * interest * totalFieldQuestions), totalQuestionsByDifficulty['Easy']);
                const mediumQCount = Math.min(Math.floor(0.3 * interest * totalFieldQuestions), totalQuestionsByDifficulty['Medium']);
                const hardQCount = Math.min(0.1 * interest * (totalFieldQuestions - totalQuestionsByDifficulty['Easy'] - totalQuestionsByDifficulty['Medium']), totalQuestionsByDifficulty['Hard']);

                const easyQuestionsQuery = `
                    SELECT id, problem_statment, difficulty 
                    FROM Question 
                    WHERE subject = '${subject}' AND difficulty = 'Easy'
                    ORDER BY RANDOM()
                    LIMIT ${easyQCount};
                `;
                const easyQuestions = await pool.query(easyQuestionsQuery);
                const easyQuestionIds = easyQuestions.rows.map(q => q.id);
                subjectData.easy = await fetchQuestionsWithOptions(easyQuestions.rows, easyQuestionIds);

                const mediumQuestionsQuery = `
                    SELECT id, problem_statment, difficulty 
                    FROM Question 
                    WHERE subject = '${subject}' AND difficulty = 'Medium'
                    ORDER BY RANDOM()
                    LIMIT ${mediumQCount};
                `;
                const mediumQuestions = await pool.query(mediumQuestionsQuery);
                const mediumQuestionIds = mediumQuestions.rows.map(q => q.id);
                subjectData.medium = await fetchQuestionsWithOptions(mediumQuestions.rows, mediumQuestionIds);

                const hardQuestionsQuery = `
                    SELECT id, problem_statment, difficulty 
                    FROM Question 
                    WHERE subject = '${subject}' AND difficulty = 'Hard'
                    ORDER BY RANDOM()
                    LIMIT ${hardQCount};
                `;
                const hardQuestions = await pool.query(hardQuestionsQuery);
                const hardQuestionIds = hardQuestions.rows.map(q => q.id);
                subjectData.hard = await fetchQuestionsWithOptions(hardQuestions.rows, hardQuestionIds);

                fieldData.subjects.push(subjectData);
            }

            setOfQuestions.push(fieldData);
        }

        res.json({ success: true, questions: setOfQuestions });

    } catch (error) {
        console.error('Error while generating quiz:', error);
        res.status(500).json({ success: false, message: 'An error occurred while generating the quiz.' });
    }
};

const fetchQuestionsWithOptions = async (questions, questionIds) => {
    if (questionIds.length === 0) return [];

    const optionsQuery = `
        SELECT id, option, answer 
        FROM Option 
        WHERE id = ANY($1);
    `;
    const optionsResult = await pool.query(optionsQuery, [questionIds]);
    const optionsByQuestion = groupOptionsByQuestion(optionsResult.rows);

    return questions.map(question => ({
        ...question,
        options: optionsByQuestion[question.id] || [],
        correctAnswer: (optionsByQuestion[question.id] || []).filter(opt => opt.answer).map(opt => opt.option),
        answer: ''
    }));
};

const groupOptionsByQuestion = (options) => {
    const grouped = {};
    options.forEach(option => {
        if (!grouped[option.id]) {
            grouped[option.id] = [];
        }
        grouped[option.id].push({
            option: option.option,
            answer: option.answer
        });
    });
    return grouped;
};
