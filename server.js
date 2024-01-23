const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const connectionString =
	"mongodb+srv://lucanocasillas:sj17QfwUYUGmXaMg@cluster0.enyrnwg.mongodb.net/?retryWrites=true&w=majority";

//Database connection
MongoClient.connect(connectionString)
	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("the-simpsons-quotes");
		const quotesCollection = db.collection("quotes");

		// View-related middleware
		app.set("view engine", "ejs");

		//Global middleware
		app.use(bodyParser.urlencoded({ extended: true }));

		//Route definitions
		app.get("/", (req, res) => {
			const cursor = quotesCollection
				.find()
				.toArray()
				.then((results) => {
					console.log(results);
					res.render("index.ejs", { quotes: results });
				})
				.catch((error) => console.error(error));
		});

		app.post("/quotes", (req, res) => {
			quotesCollection
				.insertOne(req.body)
				.then((result) => {
					res.redirect("/");
					console.log(result);
				})
				.catch((error) => console.error(error));
		});

		//Start server
		app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
	})
	.catch((error) => console.error(error));
