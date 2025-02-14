import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type sendMailPropsType = {
  to: string;
  subject: string;
  text: string;
};

export const sendMail = async ({ to, subject, text }: sendMailPropsType) => {
  if (!to || !subject || !text) {
    throw new Error("Missing required fields");
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
