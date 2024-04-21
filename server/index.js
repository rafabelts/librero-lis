const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { handleSignUp, handleLogIn, userSessionStatus, signOut, changeName, changePassword, sendEmailToRecoverPassword } = require("./middlewares/auth.js");
const { addBook, addBookToLoan, fetchBooksData, fetchBooksOnLoanData, fetchStudentsData, returnToInventory } = require("./middlewares/book_management.js");

dotenv.config();

const port = process.env.PORT;
const supabase_url = process.env.SUPABASE_URL;
const supabase_key = process.env.SUPABASE_KEY;

const app = express();

const corsOptions = {
    optionSuccessStatus: 201,
};

const supabase = createClient(supabase_url, supabase_key);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));




app.get("/", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});

app.post("/auth/sign-up", handleSignUp);
app.post("/auth/log-in", handleLogIn);
app.post("/auth/change-name", changeName);
app.post("/auth/send-recovery-email", sendEmailToRecoverPassword);
app.post("/auth/change-password", changePassword);

app.get("/auth/user-session-status", userSessionStatus);
app.get("/auth/sign-out", signOut)

app.get("/books/fetch-books-data", fetchBooksData);
app.get("/books/fetch-books-on-loan-data", fetchBooksOnLoanData);
app.get("/auth/fetch-students-data", fetchStudentsData);

app.post("/books/add", addBook);
app.post("/books/return-book", returnToInventory);
app.post("/books/add-loan", addBookToLoan);

app.listen(port);

module.exports = supabase
module.exports = app;

