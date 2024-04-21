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


app.get("*", (req, res) => {
    res.send("<h1>Hola!</h1>");
})


app.get("/api/librero-lis", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});

app.post("/api/librero-lis/auth/sign-up", handleSignUp);
app.post("/api/librero-lis/auth/log-in", handleLogIn);
app.post("/api/librero-lis/change-name", changeName);
app.post("/api/librero-lis/send-recovery-email", sendEmailToRecoverPassword);
app.post("/api/librero-lis/change-password", changePassword);

app.get("/api/librero-lis/user-session-status", userSessionStatus);
app.get("/api/librero-lis/sign-out", signOut)

app.get("/api/librero-lis/fetch-books-data", fetchBooksData);
app.get("/api/librero-lis/fetch-books-on-loan-data", fetchBooksOnLoanData);
app.get("/api/librero-lis/fetch-students-data", fetchStudentsData);

app.post("/api/librero-lis/books/add", addBook);
app.post("/api/librero-lis/books/return-book", returnToInventory);
app.post("/api/librero-lis/books/add-loan", addBookToLoan);

app.listen(port);

module.exports = supabase
module.exports = app;

