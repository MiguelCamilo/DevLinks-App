import { NextApiRequest, NextApiResponse } from 'next';

import nodemailer from 'nodemailer';
import Mailgen, { Option } from 'mailgen';

// interface ProductOption extends Option {
//     product: {
//         name: string,
//         link: string
//     }
// }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	try {
		const { username, email, text, subject } = req.body;

		let config = {
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.NEXT_PUBLIC_EMAIL,
				pass: process.env.EMAIL_TOKEN,
			},
		};

		let transporter = nodemailer.createTransport(config);

		// object you pass needs to satisfy the 'Option' type by having a 'theme' property,
		// either directly on the object, through an interface, or by casting.

		let MailGenerator = new Mailgen({
			product: {
				name: 'Mailgen',
				link: 'https://mailgen.js/',
			},
		} as Option);

		let response = {
			body: {
				name: username,
				intro: text || `Glad you joined DevLink, looking forward to connecting!`,
				outro: '© DevLink',
			},
		};

		let mail = MailGenerator.generate(response);

		let message = {
			from: process.env.NEXT_PUBLIC_USER_EMAIL,
			to: email,
			subject: subject || 'Welcome to DevLink!',
			html: mail,
		};

		try {
			await transporter.sendMail(message);
			res.status(201).send({ message: 'Please check your email.' });
		} catch (error) {
			res.status(500).send({ error });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
