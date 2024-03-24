import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { handleSignUp, handleLogIn, userSessionStatus, signOut } from "./middlewares/auth.js";
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

app.get("/api/librero-lis", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});

app.post("/api/librero-lis/auth/sign-up", handleSignUp);
app.post("/api/librero-lis/auth/log-in", handleLogIn);
app.get("/api/librero-lis/user-session-status", userSessionStatus);
app.get("/api/librero-lis/sign-out", signOut)




app.listen(port);
