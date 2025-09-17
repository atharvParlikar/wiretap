import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "atharvparlikar@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export async function sendMail({ to, subject, message }: Record<string, string>) {
  console.log("from sendMail");
  console.log({
    to,
    subject,
    message
  });

  try {
    await transporter.sendMail({
      from: '"Atharv Parlikar" <atharvparlikar@gmail.com>',
      to,
      subject,
      text: message
    });
  } catch (err) {
    console.log('nigga error:\n', err);
    return false;
  }

  return true;
}

