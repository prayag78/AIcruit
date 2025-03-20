import nodemailer from "nodemailer";

const sendEmail = async (to, status, jobRole, company) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject, text;

    if (status.toLowerCase() === "accepted") {
      subject = `Congratulations! Your Application for ${jobRole} at ${company} has been Accepted`;
      text = `Dear Applicant,\n\nWe are pleased to inform you that your application for the position of ${jobRole} at ${company} has been accepted. We will contact you shortly with further details.\n\nBest regards,\n${company} Team`;
    } else if (status.toLowerCase() === "rejected") {
      subject = `Update on Your Application for ${jobRole} at ${company}`;
      text = `Dear Applicant,\n\nThank you for applying for the position of ${jobRole} at ${company}. After careful consideration, we regret to inform you that your application has not been successful at this time. We encourage you to apply for future opportunities.\n\nBest regards,\n${company} Team`;
    } else {
      throw new Error("Invalid status provided.");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export default sendEmail;
