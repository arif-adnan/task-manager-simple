const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middlewares
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1', tasks);
app.use(notFound);
app.use(errorHandler);  


const port = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB(process.env.DATABASE);
		app.listen(port, () => {
			console.log(`server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
