const nodeMailer = require('nodemailer');

function toICalDate(dt) {
  var dtVal = new Date(dt);
  var year = dtVal.getFullYear();
  var month = String(dtVal.getMonth() + 1).padStart(2, '0'); // '09'
  var date = String(dtVal.getDate()).padStart(2, '0'); // '09'
  //Format eg:20210921      
  return `${year}${month}${date}`;
}

function toICalTime(time) {
  //var dtVal = new Date(dt);
  var res = `${time}`.replace(/:/g, "").replace(/./g, "");
  //Format eg:20210921T000000Z       
  return res; //`${hour}${min}${sec}`;
}

function toICalDateTime(date,time) {
  //Format eg:20210921T000000Z      
  return `${toICalDate(date)}T${toICalTime(time)}Z`;
}

// Return the content in icalevent format
function getICalEventCotent(appt) {
  let content = 'BEGIN:VCALENDAR\n' +
    'VERSION:2.0\n' +
    'BEGIN:VEVENT\n' +
    'SUMMARY:PawTime Appointment\n' +
    'DTSTART;VALUE=DATE:' + toICalDateTime(appt.date, appt.time) + '\n' +
    'DTEND;VALUE=DATE:' + toICalDateTime(appt.date, appt.time) + '\n' +
    'LOCATION:' + appt.address + ' \n' +
    'DESCRIPTION:Yearly checkup\n' +
    'STATUS:CONFIRMED\n' +
    'SEQUENCE:3\n' +
    'BEGIN:VALARM\n' +
    'TRIGGER:-PT10M\n' +
    'DESCRIPTION:' + appt.notes + '\n' +
    'ACTION:DISPLAY\n' +
    'END:VALARM\n' +
    'END:VEVENT\n' +
    'END:VCALENDAR';
  return content;
}

module.exports = {

  sendEventEmail: async function (appt) {
    try {
/* Sample appointment object:
      const appt = {
        "id": 7,
        "date": "2021-10-28",
        "time": "23:19:41.738",
        "address": "Test event 7",
        "notes": "Test",
        "pet_id": 1,
        "user_email": "",
        "pet_name": ""
      };
*/
      console.log("Sending email start" + JSON.stringify(appt));
      let transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PWD
        }
      });
      let content = getICalEventCotent(appt);
      console.log("Event content" + content);

      let mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: appt.user_email,
        subject: "Vet Appointment",
        text: "REMIMNDER for " + appt.pet_name,
        icalEvent: {
          filename: "invitation.ics",
          method: 'request',
          content: content
        }
      };

      let info = await transporter.sendMail(mailOptions);
      console.log("Sent email: " + info);

    } catch (error) {
      console.log("Send Email Error: " + error);
    }
  }
}