const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const dotenv      = require('dotenv');
const mongoose    = require('mongoose');

//routes

const authRoutes  = require('./routes/auth.router');

dotenv.config({
	path: './config/config.env'
})

const app = express();

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'dev') {
	app.use(cors({
		origin: process.env.CLIENT_URL
	}))
	// app.use(cors())
	app.use(morgan('dev'))
}

const PORT = process.env.PORT;

app.use('/api',authRoutes);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: 'Route was not found'
	});
});

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => {
			console.log('server is running')
		});
	}
	catch (err) {
		console.log('Bad connection to DB');
	}
};

start()

