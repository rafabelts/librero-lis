import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { handleSignUp } from "./auth.js";
dotenv.config();

const ip = "10.50.15.12";

const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;

const app = express();

export const supabase = createClient(supabase_url, supabase_key);

app.use(bodyParser.json());
app.get("/librero-lis/api", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});


app.post("/api/sign-up", (req, res) => {
    const { student_id, email, password, name, user_type } = req.body;
    handleSignUp( student_id, email, password, name, user_type );

    res.json({name: name, student_id: student_id, user_type: user_type});
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/librero-lis/api`)
});
