//import { User } from "../models/userModel.js"
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import validator from 'validator';
import jwt from "jsonwebtoken";

import pg from "pg";
//import config from '../config/database.js'; // Your database configuration
import pool from "../config/localdb.js";

export const counsellorReg = async (req, res) => {
    const { domains, name, phone, email, password, highest_qualification, experience } = req.body;

    try {
        const reg = await pool.query(
            'INSERT INTO Counsellor (name,phone,email,password,highest_qualification,experience) VALUES($1,$2,$3,$4,$5,$6) returning id', [name, phone, email, password, highest_qualification, experience]
        );
        console.log(reg);
        res.status(201).json({ message: "Counsellor registered successfully", couns_id: reg.rows[0]['id'] });
        for (let i = 0; i < domains.length; i++) {
            await pool.query('insert into domains (id, domain) values($1,$2)', [reg.rows[0]['id'], domains[i]]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }

}

export const counsEdit = async (req, res) => {
    const { id, domains, name, phone, highest_qualification, experience } = req.body;

    try {
        const reg = await pool.query(
            'UPDATE Counsellor set (name,phone,highest_qualification,experience) = ($1,$2,$3,$5) where id=$4', [name, phone, highest_qualification, id, experience]
        );
        console.log(reg);
        await pool.query('delete from domains where id=$1', [id]);
        for (let i = 0; i < domains.length; i++) {
            await pool.query('insert into domains (id, domain) values($1,$2)', [id, domains[i]]);
        }
        res.status(201).json({ message: "Counsellor updated successfully", couns_id: id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Updation failed" });
    }

}

export const counsLogin = async (req, res) => {
    const { email, password } = req.query;
    console.log(email);
    try {
        const check = await pool.query(`select id,name,email,phone,highest_qualification from counsellor where email = $1 and password = $2`, [email, password]);
        console.log(check);
        if (check.rows.length === 0) {
            return res.status(250).json({ message: 'Invalid id or password' });
        }
        console.log(check.rows[0]);
        const counsellor = check.rows[0];
        const accessToken = jwt.sign(
            {
                counsId: counsellor.id,
                counsName: counsellor.name,
                counsEmail: counsellor.email,
                counsPhone: counsellor.phone,
                counsQualification: counsellor.highest_qualification
            },
            process.env.ACCESS_TOKEN_SECRET_COUNSELLOR,
            { expiresIn: "15m" }
        );
        res.status(200).json({
            message: "Counsellor Login successful",
            counsellor: {
                id: counsellor.id,
                // name: student.name,
                // email: student.email
            },
            accessToken
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login Failed" });
    }
};

// export const addDomains = async (req,res) => {
//     const {} = req.body;
//     try {
//         const reg= await pool.query(
//             'INSERT INTO Counsellor (name,phone,email,password,highest_qualification) VALUES($1,$2,$3,$4,$5)',[name ,phone ,email ,password, highest_qualification ]
//         );
//         res.status(201).json({ message: "Counsellor register successfully"});
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Registration failed" });
//     }
// }


// const { Pool } = pg;
// const pool = new Pool(config);
export const getAllCounsInfo = async (req, res) => {
    try {
        const counsellors = await pool.query('SELECT id,name,email,rating FROM Counsellor');
        res.json({
            message: "Got all counsellors",
            counsellors
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
};
export const getActiveSlots = async (req, res) => {
    const { id } = req.query;
    console.log(id);

    // console.log("hi");
    try {
        const slots = await pool.query(`SELECT t.slot_id, t.start_time, t.end_time, 
            to_char(current_date+((t.day-extract(dow from current_date)+7)%7)::int, 'dd-mm-yyyy') as day
            FROM Timeslot t where counsellor_id = ${id} and status=true and
            not exists(select * from request where slot_id=t.slot_id and counsellor_id=t.counsellor_id and status_of_request in ('Pending','Accepted')) 
            order by day asc, start_time asc, end_time asc`);
        
        res.json({
            slots
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

export const getAllSlots = async (req, res) => {
    const { id } = req.query;
    console.log(id);

    // console.log("hi");
    try {
        const slots = await pool.query(`SELECT t.slot_id, t.start_time, t.end_time, t.status, 
            to_char(current_date+((t.day-extract(dow from current_date)+7)%7)::int, 'dd-mm-yyyy') as day
            FROM Timeslot t where counsellor_id = ${id} and
            not exists(select * from request where slot_id=t.slot_id and counsellor_id=t.counsellor_id and status_of_request in ('Pending','Accepted')) 
            order by day asc, start_time asc, end_time asc`);
        
        res.json({
            slots
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

export const getInfoById = async (req, res) => {
    const { id } = req.query;

    try {
        const info = await pool.query(`SELECT email,experience,highest_qualification,name,phone,rating FROM Counsellor where id=${id}`);
        const domains = await pool.query(`select domain from domains where id=${id}`);
        const reviews = await pool.query(`select review from review where counsellor_id=${id}`);
        res.json({
            info, domains, reviews
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

// ------------------------------------------------------------------------------------------
export const addNewSlot = async (req, res) => {
    const { counsellor_id, start_time, end_time, days, status } = req.body;
    //const sid=500;
    try {
        // Insert new timeslot into the database and automatically get the generated slot_id
        days.forEach(async (day) => {
            const quer = await pool.query(`select * from timeslot where (counsellor_id, start_time, end_time, day)=
                ($1, $2, $3, $4)`, [counsellor_id, start_time, end_time, day]);
            if (quer.rowCount === 0) {
                const result = await pool.query(
                    `INSERT INTO Timeslot (counsellor_id, start_time, end_time, day, status)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING slot_id`,  // This returns the generated slot_id
                    [counsellor_id, start_time, end_time, day, status]
                );
            }
        });

        //const newSlotId = result.rows[0].slot_id;  // Access the newly generated slot_id
        res.status(201).json({ message: "Timeslot added successfully" });// ,"newSlotId":newSlotId});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add new timeslot" });
    }
};

export const changeSlotStatus = async (req, res) => {
    const { addSlots, removeSlots } = req.body;
    //const sid=500;
    try {
        // Insert new timeslot into the database and automatically get the generated slot_id
        addSlots.forEach(async (slot) => {
            const quer = await pool.query(`update timeslot set status=true where slot_id=$1`, [slot]);
        });
        removeSlots.forEach(async (slot) => {
            const quer = await pool.query(`update timeslot set status=false where slot_id=$1`, [slot]);
        });

        //const newSlotId = result.rows[0].slot_id;  // Access the newly generated slot_id
        res.status(201).json({ message: "Timeslots updated successfully" });// ,"newSlotId":newSlotId});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update timeslots" });
    }
};

export const changeReqStatus = async (req, res) => {
    const { slot_id, couns_id, status } = req.body;

    // 1 -> accepted
    // 0 -> denied

    let statusReq = "Accepted";

    if (status == 0) statusReq = "Denied";
    try {
        //  const ack= await pool.query(`Update Request set status_of_request=${statusReq}   where student_id=${stud_id} and counsellor_id=${couns_id}`);
        const ack = await pool.query(`UPDATE Request 
             SET status_of_request = $1 
             WHERE slot_id = $2 AND counsellor_id = $3`,
            [statusReq, slot_id, couns_id]);
        res.json({
            ack
        });
    }
    catch (err) {
        console.error('D', err.stack);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

export const viewRequests = async (req, res) => {
    const { cId } = req.query;
    try {
        const requests = await pool.query(`SELECT student_id,slot_id FROM Request where counsellor_id=$1`, [cId]);
        console.log(requests);
        var slots = [];
        for (let i = 0; i < requests.rows.length; i++) {
            const slotReq = await pool.query(`select start_time,end_time from timeslot where slot_id=$1`, [requests.rows[i]['slot_id']]);
            const stuReq = await pool.query(`select name,email from student where id=$1`, [requests.rows[i]['student_id']]);
            slots.push({
                slot_id: requests.rows[i]['slot_id'],
                sId: requests.rows[i]['student_id'],
                sName: stuReq.rows[0]['name'],
                sEmail: stuReq.rows[0]['email'],
                start_time: slotReq.rows[0]['start_time'],
                end_time: slotReq.rows[0]['end_time']
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