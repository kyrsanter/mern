const fs        = require('fs');
const path      = require('path');

exports.logger = (message) => {
	const logFilePath = path.join(__dirname, '../log.json');
	fs.readFile(logFilePath, (err, res) => {
		if (err) return
		let logItem = {
			message,
			date: new Date()
		}
		let msg = JSON.parse(res.toString())
		msg.push(logItem)
		fs.writeFile(logFilePath, JSON.stringify(msg), 'utf-8', (err) => {
			if (err) {
				console.log('Write log.txt err: ', err)
			}
		})
	})
}
