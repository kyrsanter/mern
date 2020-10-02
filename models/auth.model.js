const {Schema, model}        = require('mongoose');
const bcrypt          = require('bcrypt');

const {logger}        = require('../helpers/loger.helper')

const userSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	hashed_password: {
		type: String,
		required: true,
	},
	salt: String,
	role: {
		type: String,
		default: 'Normal',
	},
	resetPasswordLink: {
		data: String,
		default: ''
	}
}, {timestamp: true});

userSchema.virtual('password')
	.set(function(password) {
		this.password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password)
	})
	.get(function() {
		return this._password;
	})

userSchema.methods = {
	saltRounds: 10,
	makeSalt: bcrypt.genSalt(this.saltRounds, function(err, salt) {
		if (err) {
			return ''
		}
		return salt;
	}),
	encryptPassword: function(password) {
		bcrypt.hash(password, salt, function(err, hash) {
			if (!password || err) {
				logger('Password error')
			}
			return hash
		});
	},
	authenticate: function(plainedPassword) {
		return bcrypt.compare(plainedPassword, this.hashed_password, (err, res) => {
			if (err) {
				logger('Error in comparing passwords');
				return false;
			}
			return res
		})
	}
}

module.exports = model('User', userSchema)