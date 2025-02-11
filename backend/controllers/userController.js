
//import { pool } from './dbConnection.js'; // Your PostgreSQL connection pool
import pool from "../config/localdb.js";
import { spawn } from 'child_process';
import jwt from 'jsonwebtoken';

export const login = async (req,res) => {
    try {
        const {email,password} = req.query;
        // if(!id || !password){
        //     return res.status(400).json({message:" Id and password are required"});
        // }
        const checklogin= await pool.query(`SELECT  id,name,email FROM student where email=$1 and password=$2`,[email,password]);

        if (checklogin.rows.length === 0) {
            return res.status(250).json({ message: 'Invalid id or password' });
        }   
        const student=checklogin.rows[0];

        const accessToken = jwt.sign(
            {
              stuName: student.name,
              stuId: student.id,
              stuEmail: student.email,
            },
            process.env.ACCESS_TOKEN_SECRET_STUDENT,
            { expiresIn: "15m" }
          );
          console.log(accessToken);

        res.status(200).json({
            message:"Login successful",
            student: {
                id: student.id,
                // name: student.name,
                // email: student.email
            },
            accessToken
        })
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const logout = async () => {

}
export const requestSession = async (req, res) => {
    try {
        // Get data from the request body 
        const { student_id, counsellor_id, status_of_request, slot_id } = req.body; 
        console.log(student_id, counsellor_id, status_of_request, slot_id);
        // const a = stringToInteger(student_id);
        // const b = stringToInteger(counsellor_id);
        // const c = stringToInteger(slot_id);
        const values = [student_id, counsellor_id, status_of_request, slot_id];
        const insertStudentQuery = `
                INSERT INTO Request (student_id, counsellor_id, status_of_request, slot_id)
                VALUES ($1, $2, $3, $4) RETURNING slot_id`;
        const result = await pool.query(insertStudentQuery, values);
        // Step 3: Send success response
        res.status(201).json({ message: 'Session registered successfully!' });

    } catch (error) {
        console.error('Error registering session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const registerStud = async (req, res) => {
    try {
        // Get data from the request body 
        const { acad, namee, phone, email, password, hobbies,edu_achieve,extra_achieve } = req.body; //, name, phone, email, password, hobbies, edu_achieve, interest 

        // Step 1: Insert student data into the Student table
        
        const insertStudentQuery = `
                INSERT INTO Student ( name, phone, email, password, hobbies ,edu_achieve, extra_achieve)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
        const values = [namee, phone, email, password, hobbies, edu_achieve,extra_achieve];

        // Add basic details
        const result = await pool.query(insertStudentQuery, values);
        console.log(result);
        const studentId = result.rows[0].id;
        console.log(studentId);
        // TOKEN // SESSION CREATION

        // add 10th marks in table
        
            
        console.log(acad);

        // Trigger ML model
        await addNewProfile({acad,studentId});  //studentId, name, edu_achieve, interest);

        // Step 3: Send success response
        res.status(201).json({ message: 'Student registered successfully!' , stu_id: studentId}); //, studentId

    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const addNewProfile = async ({acad,studentId}) => {
    return new Promise((resolve, reject) => {
        // Step 1: Trigger the Python ML Model using spawn
        const x = acad.selfStdyHrs,
            y = acad.extraCuri,
            w = acad.mathScore,
            z = acad.langScore,
            p = acad.scienceScore,
            q = acad.englishScore,
            r = acad.sstScore;
            console.log(acad,studentId);
        const pythonProcess = spawn('python', ['./mlmodel/Model.py', x, y, w, z, p, q, r]);

        pythonProcess.stdout.on('data', async (data) => {
            // Parse the data returned by the ML model 
            const mlResult = JSON.parse(data.toString());
            const  interestFields  =[
                { "fieldName":"Arts","interestScore": mlResult.Arts},
                { "fieldName":"Commerce","interestScore": mlResult.Commerce},
                { "fieldName":"PCB","interestScore": mlResult.PCB},
                { "fieldName":"PCM","interestScore": mlResult.PCM},
                { "fieldName":"Others","interestScore": mlResult.Others}
            ];
            
            console.log(mlResult, interestFields);

            // Add predicited interest in table
        
            const insertInterestQuery = `
                INSERT INTO predicted_Interest (id, field, interest)
                VALUES ($1, $2, $3)`; 

            for (const field of interestFields){ 
                const interestValues = [studentId, field.fieldName, field.interestScore];
                await pool.query(insertInterestQuery, interestValues);
            }
            // console.log('ML data inserted into Interest table');
            resolve();
        });

        // Handle any errors from the Python process
        pythonProcess.stderr.on('data', (data) => {
            console.error('Error from ML model:', data.toString());
            reject(new Error('Error from ML model'));
        });
    });
};

export const studEdit = async (req, res) => {
    try {
        // Get data from the request body 
        const { id, acad, namee, phone, hobbies,edu_achieve,extra_achieve } = req.body; //, name, phone, email, password, hobbies, edu_achieve, interest 

        // Step 1: Insert student data into the Student table
        
        const insertStudentQuery = `
                UPDATE Student set ( name, phone, hobbies ,edu_achieve, extra_achieve)
                = ($1, $2, $3, $4, $5) where id=$6`;
        const values = [namee, phone, hobbies, edu_achieve,extra_achieve, id];

        // Add basic details
        const result = await pool.query(insertStudentQuery, values);
        console.log(result);
        // TOKEN // SESSION CREATION

        // add 10th marks in table
        
            
        console.log(acad);
        console.log("hello",id);

        // Trigger ML- model
        await stuEditProfile({acad: acad,studentId: id});  //studentId, name, edu_achieve, interest);

        // Step 3: Send success response
        res.status(201).json({ message: 'Student profile updated successfully!' , stu_id: id}); //, studentId

    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const stuEditProfile = async ({acad,studentId}) => {
    console.log("inside",studentId,acad);
    return new Promise((resolve, reject) => {
        // Step 1: Trigger the Python ML Model using spawn
        const x = acad.selfStdyHrs,
            y = acad.extraCuri,
            w = acad.mathScore,
            z = acad.langScore,
            p = acad.scienceScore,
            q = acad.englishScore,
            r = acad.sstScore;
        const pythonProcess = spawn('python', ['./mlmodel/Model.py', x, y, w, z, p, q, r]);

        pythonProcess.stdout.on('data', async (data) => {
            // Parse the data returned by the ML model 
            const mlResult = JSON.parse(data.toString());
            const  interestFields  =[
                { "fieldName":"Arts","interestScore": mlResult.Arts},
                { "fieldName":"Commerce","interestScore": mlResult.Commerce},
                { "fieldName":"PCB","interestScore": mlResult.PCB},
                { "fieldName":"PCM","interestScore": mlResult.PCM},
                { "fieldName":"Others","interestScore": mlResult.Others}
            ];
            console.log("hello",studentId);
            console.log(mlResult, interestFields);

            // Add predicited interest in table

            console.log(await pool.query(`update predicted_interest set interest=$2 where (id,field)=($1,'PCB') returning id`,[studentId,mlResult.PCB]));
        
            const insertInterestQuery = `
                UPDATE predicted_Interest set interest
                = $3 where (id,field) = ($1,$2)`; 
                
            for (let i=0; i<interestFields.length; i++){ 
                console.log(interestFields[i]);
                const interestValues = [studentId, interestFields[i].fieldName, interestFields[i].interestScore];
                await pool.query(insertInterestQuery, interestValues);
            }
            // console.log(await pool.query(`select * from predicted_interest where id=$1`, [studentId]));
            // console.log('ML data inserted into Interest table');
            resolve();
        });

        // Handle any errors from the Python process
        pythonProcess.stderr.on('data', (data) => {
            console.error('Error from ML model:', data.toString());
            reject(new Error('Error from ML model'));
        });
    });
};

export const updateProfile = async () => {
    // similar
}
export const getProfileByUserId = async (req,res) => {
    try {
        const {id}=req.query;

        const basicDetails=await pool.query(`Select * from Student where id=${id}`);
        const predictions=await pool.query(`Select field,interest from predicted_Interest where id=${id}`);

        console.log(basicDetails.rows,predictions.rows);

        return res.status(200).json({
            "message":"Got the profile",
            basicDetails,
            predictions 
        })
    } catch (error) { 
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



function stringToInteger(str) {
    let result = 0;
    const base = 31; // A prime number used as a base multiplier (can be any other prime)

    for (let i = 0; i < str.length; i++) {
        // Get the ASCII value of the character
        const charValue = str.charCodeAt(i);
        // Combine it using the base multiplier to create a unique number
        result = result * base + charValue;
    }

    return result;
}

export const getRequests = async (req, res) => {
    const { sId } = req.query;
    try {
        const requests = await pool.query(`SELECT counsellor_id,slot_id,status_of_request FROM Request where student_id=$1`, [sId]);
        console.log(requests);
        var slots = [];
        for (let i = 0; i < requests.rows.length; i++) {
            const slotReq = await pool.query(`select start_time,end_time from timeslot where slot_id=$1`, [requests.rows[i]['slot_id']]);
            const stuReq = await pool.query(`select name,email from counsellor where id=$1`, [requests.rows[i]['counsellor_id']]);
            slots.push({
                slot_id: requests.rows[i]['slot_id'],
                cName: stuReq.rows[0]['name'],
                cEmail: stuReq.rows[0]['email'],
                start_time: slotReq.rows[0]['start_time'],
                end_time: slotReq.rows[0]['end_time'],
                status: requests.rows[i]['status_of_request']
            });
        }
        res.json({
            message: "Got all Requests",
            slots
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
};

// export const makeQuiz = async (req,res)=>{
//     const {stud_id} = req.body;

//     const interest = pool.query(`select interest ......from interest table`);

//     // get the number of total questinos of each difficulty levels for particular subject
//     var noOfMathsQEasy= // SQL QUERY
//     var noOfMathsQMedium
//     var noOfMathsQHard

//     //... similary for all interest (jo interest array me h)

//     var probabilityOfInterst=// query from database;
//     // similary get prob of each interest

//     var requiredAmountOfQuestionEasy= pro*totalNoOfQuestio
//     var requiredAmountOfQuestionMedium= pro*totalNoOfQuestio
//     var requiredAmountOfQuestionHard= pro*totalNoOfQuestio
//     ........
//     ........

//     // now fetch the required amount of questions for each interest with particular difficulty level
//     return setOfQuestions;
// }
/*
export const makeQuiz = async (req, res) => {
    const { stud_id } = req.body;

    // Fetch interest levels from the database
    const interestQuery = SELECT interest FROM interest_table WHERE stud_id = ?; // Adjust as needed
    const [interestResults] = await pool.query(interestQuery, [stud_id]);
    
    const interest = interestResults.map(row => row.interest);
    const totalQuestions = 30;
    const noQuestions = [];

    const careers = {
        0: 'Arts',
        1: 'Commerce',
        2: 'PCB',
        3: 'PCM',
        4: 'Others'
    };

    const questionTypes = {
        0: ['History', 'Sociology', 'Psychology', 'Geography', 'Political Science'], // Arts
        1: ['Economics', 'Accountancy', 'Business Studies', 'Basic Commercial Knowledge', 'Mathematics in Commerce'], // Commerce
        2: ['Physics', 'Chemistry', 'Biology'], // PCB
        3: ['Physics', 'Chemistry', 'Maths'] // PCM
    };

    // Calculate the number of questions for each subject based on interest
    for (let i = 0; i < interest.length; i++) {
        const perSubjQ = Math.floor(interest[i] * totalQuestions);
        let E_M_H_Qs = [];
        const a = Math.floor(interest[i] * 100);

        if (a < 50) {
            E_M_H_Qs = [Math.floor(0.5 * perSubjQ), Math.floor(0.33 * perSubjQ), Math.floor(0.17 * perSubjQ)];
        } else if (a < 60) {
            E_M_H_Qs = [Math.floor(0.4 * perSubjQ), Math.floor(0.30 * perSubjQ), Math.floor(0.30 * perSubjQ)];
        } else if (a < 70) {
            E_M_H_Qs = [Math.floor(0.4 * perSubjQ), Math.floor(0.30 * perSubjQ), Math.floor(0.30 * perSubjQ)];
        } else if (a < 80) {
        } else if (a < 100) {
            E_M_H_Qs = [Math.floor(0.30 * perSubjQ), Math.floor(0.30 * perSubjQ), Math.floor(0.40 * perSubjQ)];
            E_M_H_Qs = [Math.floor(0.25 * perSubjQ), Math.floor(0.25 * perSubjQ), Math.floor(0.50 * perSubjQ)];
        }

        noQuestions.push(E_M_H_Qs);
    }

    // Generate SQL queries to fetch the required questions
    const setOfQuestions = [];
    
    for (let i = 0; i < questionTypes.length; i++) {
        const easyQuery = `
            SELECT id FROM questions 
            WHERE difficulty = 'Easy' 
            AND subject IN (${questionTypes[i].map(subject => '${subject}').join(', ')}) 
            ORDER BY RANDOM() 
            LIMIT ${noQuestions[i][0]};`;
        
        const mediumQuery = `
            SELECT id FROM questions 
            WHERE difficulty = 'Medium' 
            AND subject IN (${questionTypes[i].map(subject => '${subject}').join(', ')}) 
            ORDER BY RANDOM() 
            LIMIT ${noQuestions[i][1]};`;
        
        const hardQuery = `
            SELECT id FROM questions 
            WHERE difficulty = 'Hard' 
            AND subject IN (${questionTypes[i].map(subject => '${subject}').join(', ')}) 
            ORDER BY RANDOM() 
            LIMIT ${noQuestions[i][2]};`;
        
        // Execute the queries and collect results
        const easyQuestions = await pool.query(easyQuery);
        const mediumQuestions = await pool.query(mediumQuery);
        const hardQuestions = await pool.query(hardQuery);
        
        setOfQuestions.push({
            easy: easyQuestions,
            medium: mediumQuestions,
            hard: hardQuestions
        });
    }

    // Send back the result as a response
    res.json(setOfQuestions);
};*/
