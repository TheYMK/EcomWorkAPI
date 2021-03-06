const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			max: 32,
			unique: true,
			index: true,
			lowercase: true
		},
		name: {
			type: String,
			trim: true,
			required: true,
			max: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true
		},
		profile: {
			type: String,
			required: true
		},
		hashed_password: {
			type: String,
			required: true
		},
		salt: String,
		bio: {
			type: String
		},
		role: {
			type: Number,
			default: 3 //1 for admins, 2 for clients, 3 for freelancers
		},
		photo: {
			data: Buffer,
			contentType: String
		},
		skills: [
			{
				type: String
			}
		],
		experiences: [
			{
				type: String
			}
		],
		education: [
			{
				type: String
			}
		],
		availability_status: {
			type: Boolean,
			default: true
		},
		resetPasswordLink: {
			data: String,
			default: ''
		}
	},
	{ timestamps: true }
);

// virtual fields
userSchema
	.virtual('password')
	.set(function(password) {
		// create a temporary variable called _password
		this._password = password;
		// generate salt
		this.salt = this.makeSalt();
		// encryptPassword
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

// methods
userSchema.methods = {
	// Compare plain password with hashed password and return true or false. Used to authenticate
	authenticate: function(plainPassword) {
		return this.encryptPassword(plainPassword) === this.hashed_password;
	},
	// Encrypt the password using crypto
	encryptPassword: function(password) {
		if (!password) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		} catch (err) {
			return '';
		}
	},
	// Generate the salt that will be used to encrypt the password
	makeSalt: function() {
		return Math.round(new Date().valueOf() * Math.random()) + '';
	}
};

module.exports = mongoose.model('User', userSchema);
