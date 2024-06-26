const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { handleSignUp, handleLogIn, signOut, changeName, changePassword, sendEmailToRecoverPassword } = require("./middlewares/auth.js");
const { addBook, addBookToLoan, fetchBooksData, fetchBooksOnLoanData, fetchStudentsData, returnToInventory, deleteBook, deleteBookCopy, fetchStudentBooksOnLoanData } = require("./middlewares/book_management.js");

dotenv.config();

const port = process.env.PORT;

const app = express();

const corsOptions = {
    origin: true,
    optionSuccessStatus: 201,
};


app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("<h1>API Librero LIS</h1>")
});

app.get("/auth", (req, res) => {
    res.send("<h1>Auth</h1>")
})
app.post("/auth/sign-up", handleSignUp);
app.post("/auth/log-in", handleLogIn);
app.post("/auth/change-name", changeName);
app.post("/auth/send-recovery-email", sendEmailToRecoverPassword);
app.post("/auth/change-password", changePassword);

app.get("/auth/sign-out", signOut)
app.get("/auth/fetch-students-data", fetchStudentsData);

app.get("/books/fetch-books-data", fetchBooksData);
app.get("/books/fetch-books-on-loan-data", fetchBooksOnLoanData);
app.post("/books/fetch-students-books-on-loan-data", fetchStudentBooksOnLoanData);

app.post("/books/add", addBook);
app.post("/books/return-loan", returnToInventory);
app.post("/books/add-loan", addBookToLoan);

app.post("/books/delete-book", deleteBook);
app.post("/books/delete-book-copy", deleteBookCopy);

app.listen(port);
