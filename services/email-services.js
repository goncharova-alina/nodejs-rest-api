const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #TemplateGenerator = Mailgen;

  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#TemplateGenerator({
      theme: 'default',
      product: {
        name: 'Contacts',
        link: 'http://localhost:3000',
      },
    });

    const email = {
      body: {
        name,
        intro: "Welcome to Contacts! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Contacts, please click here:',
          button: {
            color: '#22BC33', // Optional action button color
            text: 'Confirm your account',
            link: `http://localhost:3000/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    return emailBody;
  }

  async sendEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: '	om.kaliuzhna.dz@gmail.com', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTemplate(verifyToken, name),
    };

    this.#sender.send(msg);
  }
}
module.exports = EmailService;