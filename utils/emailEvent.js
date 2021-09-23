const express    = require('express');
const http       = require('http');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors  = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/v1/sendemail", (req, res) => {

  let transporter = nodeMailer.createTransport({
    host: "mail.groberman.tech",
    secureConnection: true,
    port: 465,
    tls: {
      chipers: "SSLv3"
    },
    auth: {
      user: "pawtime@groberman.tech",
      pass: "M0nd@y23!!@#"
    }
  });
  let content = 'BEGIN:VCALENDAR\n' +
        'VERSION:2.0\n' +
        'BEGIN:VEVENT\n' +
        'SUMMARY:Summary123\n' +
        'DTSTART;VALUE=DATE:20210921T000000Z\n' +
        'DTEND;VALUE=DATE:2020210921T113000Z\n' +
        'LOCATION:The Closest Vet!!! \n' +
        'DESCRIPTION:Yearly checkup\n' +
        'STATUS:CONFIRMED\n' +
        'SEQUENCE:3\n' +
        'BEGIN:VALARM\n' +
        'TRIGGER:-PT10M\n' +
        'DESCRIPTION:Yearly Checkup\n' +
        'ACTION:DISPLAY\n' +
        'END:VALARM\n' +
        'END:VEVENT\n' +
        'END:VCALENDAR';

  let mailOptions = {
    from: "PawTime@groberman.tech",
    to: "michael.groberman@me.com",
    subject: "Vet Appointment",
    text: "REMIMNDER for Buddy",
    icalEvent: {
        filename: "invitation.ics",
        method: 'request',
        content: content
        }
      };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(500).send({
        message: {
          Error: "Could not sent email"
        }
      })
    }
  });
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});