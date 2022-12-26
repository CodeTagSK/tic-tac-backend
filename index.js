const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/User");

var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// const defaultPort = 3001;
const port = 3002;

const db = mongoose.connect(
	"mongodb+srv://stackwebdev:oE52n2tF55QnyL2G@cluster0.aren1y6.mongodb.net/Tic-Tac-Toe",
	() => {
		console.log("mogodb connected");
	}
);

// async function storeData() {
// 	try {
// 		const data = new UserModel({
// 			name: "Sainath",
// 			userName: "sairam",
// 			email: "sai@gmail.com",
// 			password: "sjbcjbhb",
// 		});

// 		data.save();
// 	} catch (error) {
// 		console.log("no data available");
// 	}
// }
// storeData();

app.post("/user", async (req, res) => {
	const data = new UserModel(req.body);

	console.log(data);

	data.save().then(() => {
		console.log("Saved user details");
	});
});

app.get("/", (req, res) => {
	res.send("Routes are working on AWS");
});
app.get("/user", async (req, res) => {
	const userDetails = await UserModel.find();
	console.log("get request");
	return res.status(200).json(userDetails);
});

app.listen(port);
