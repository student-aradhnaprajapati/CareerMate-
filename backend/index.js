import express from "express"; // (2nd ->> way)change in package.json
import dotenv from "dotenv";
//import connectDB from "./config/database.js";
import cors from "cors";
import http from "http";
//import client from "./config/database.js";
import counsRoutes from "./routes/counsellorRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
//import { Client } from "pg";
import pg from "pg";
//import config from './config/database.js'; // Your database configuration

// const { Pool } = pg;
// const pool = new Pool(config);
dotenv.config({});

const app=express();

const PORT=  5001 ; //process.env.PORT ||
 
const server = http.createServer(app);
const coresOption={
  origin:'http://localhost:3000',
  credentials:true
}; 
app.use(cors(coresOption));
app.use(express.urlencoded({extended:true}));    
app.use(express.json());

app.use("/api/v1/counsellor",counsRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/quiz",quizRoutes);

// const getCounsellors = async () => {
//   console.log("working---------------");
//   try {
//     const counsellors = await pool.query('show databases'); // Query to the table //SELECT * FROM Counsellor
//     console.log("working",counsellors); // Access the rows returned from the query
//   } catch (err) {
//     console.error('Error executing query:', err.message); // Error handling
//   }
// };

server.listen(PORT,()=>{
 //  client.connect();
  // Client();
    console.log(`Server listen at port ${PORT}`);
   // getCounsellors();
 });  





 