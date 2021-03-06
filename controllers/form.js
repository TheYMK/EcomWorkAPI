const { sendEmailWithNodemailer } = require('../helpers/email');

exports.contactUserForm = (req, res) => {
	const { name, userEmail, email, message } = req.body;

	// let maillist = [ userEmail ];

	const emailData = {
		from: process.env.EMAIL, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
		to: userEmail, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
		subject: `${process.env.APP_NAME} | Contact Form`,
		text: `Someone messaged you from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
		html: `
        <h4>Message received form:</h4>
        <p>name: ${name}</p>
        <p>email: ${email}</p>
        <p>message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://ecomwork.com</p>
    `
	};

	sendEmailWithNodemailer(req, res, emailData);
};
