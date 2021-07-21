const nodemailer = require('nodemailer');

const sMail = async (to, subject, text, html) => {
  const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'outdoorkings1@gmail.com',
      pass: 'qjdeeaoreariktep',
    },
  });

  const mail = {
    from: 'outdoorkings1@gmail.com',
    to,
    subject,
    text,
    html,
  };
  //   console.log(mail);
  //   console.log('email sent !');
  //res.send({ message: " email sent !" });

  sender.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send({ message: ' email sent !' });
      console.log('Email sent successfully: ' + info.response);
    }
  });
};

module.exports = { sMail };
