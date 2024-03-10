import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("<h1>Hello user</h1>");
});

app.post("/api/sign-up", (req, res) => {
	const {id, email, name} = req.body;
	const userData = {
		"id": id,
		"email": email,
		"name": name,
		"user_type": "student",
	}
	console.log(`Matrícula: ${userData.id}, nombre: ${userData.name}, email: ${userData.email}`);
});

app.listen(3001, () => {
	console.log(`Listening at http://localhost:3001`)
});
