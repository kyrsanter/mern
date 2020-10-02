const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const dotenv      = require('dotenv');

//routes

const authRoutes  = require('./routes/auth.router');

dotenv.config({
	path: './config/config.env'
})

const app = express();

if (process.env.NODE_ENV === 'dev') {
	// app.use(cors({
	// 	origin: process.env.CLIENT_URL
	// }))
	app.use(cors())
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

app.listen(PORT, () => {
	console.log('server is running')
});
