import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { handleSignUp, handleLogIn } from "./middlewares/auth.js";
dotenv.config();

const port = process.env.PORT;
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;

const app = express();
const corsOptions = {
    optionSuccessStatus: 201,
};

export const supabase = createClient(supabase_url, supabase_key);

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/librero-lis/api", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});

app.post("/librero-lis/api/auth/signUp", handleSignUp); 
app.post("/librero-lis/api/auth/logIn", handleLogIn);

app.listen(port, () => {
	console.log(`Listening at http://192.168.1.72:${port}/librero-lis/api`)
});
