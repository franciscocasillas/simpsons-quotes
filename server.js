const express = require("express");
const app = express();
const cors = require("cors");
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
		app.use(express.static("public"));

		//Global middleware
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(express.static("public"));
		app.use(cors());
		app.use(bodyParser.json());

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

		app.put("/quotes", (req, res) => {
			quotesCollection
				.findOneAndUpdate(
					{ name: "Homer" },
					{
						$set: {
							name: req.body.name,
							quote: req.body.quote,
						},
					},
					{
						upsert: true,
					}
				)
				.then((result) => {
					res.json("Success");
				})
				.catch((error) => {
					console.error(error);
				});
		});

		app.delete("/quotes", (req, res) => {
			quotesCollection
				.deleteOne({ name: req.body.name })
				.then((result) => {
					if (result.deletedCount === 0) {
						return res.json("No quote to delete");
					}
					res.json("Deleted Mr. Burns quote!");
				})
				.catch((error) => console.error(error));
		});

		//Start server
		app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
	})
	.catch((error) => console.error(error));
