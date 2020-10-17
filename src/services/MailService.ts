import NodeMailer, { SendMailOptions } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

const { GMAIL_ADDRESS, GMAIL_PASSWORD } = process.env;

const mailer = NodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_PASSWORD,
  },
});

// eslint-disable-next-line @typescript-eslint/ban-types
const getMailTemplate = async (template: string, replacements: object): Promise<string | boolean> => {
  const html = await fs.readFileSync(`${__dirname}/../../templates/mails/${template}.html`, { encoding: 'utf-8' });

  return handlebars.compile(html)(replacements);
};

const send = async (mail: SendMailOptions): Promise<boolean> => new Promise((resolve) => {
  mailer.sendMail(mail, (err) => {
    if (err) {
      resolve(false);
    } else {
      resolve(true);
    }
    mailer.close();
  });
});

export const sendRegistrationMail = async (to: string, activationLink: string): Promise<boolean> => {
  try {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const html = await getMailTemplate('registrationMail', { activationLink, project_name: process.env.PROJECT_NAME});

    if (!html) {
      return false;
    }

    const mail: SendMailOptions = {
      subject: `Validation créatiion de compte - ${process.env.PROJECT_NAME}`,
      from: process.env.GMAIL_ADDRESS,
      html: html as string,
      to,
    };

    return send(mail);
  } catch (e) {
    return false;
  }
};
