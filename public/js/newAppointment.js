const appointmentNoteEl = document.querySelector('#appointmentNoteInput');
appointmentNoteEl.addEventListener('change', function (e) {
  appointmentNote = e.target.value;
  console.log(e.target.value);
});

const appointmentDateEl = document.querySelector('#appointmentDateInput');
appointmentDateEl.addEventListener('change', function (e) {
  appointmentDate = e.target.value;
  console.log(e.target.value);
});

const appointmentAddressEl = document.querySelector('#appointmentAddressInput');
appointmentAddressEl.addEventListener('change', function (e) {
  appointmentAddress = e.target.value;
  console.log(e.target.value);
});

const newappointmentFormHandler = async (event) => {
  event.preventDefault();

  if ((appointmentNote, appointmentDate, appointmentAddress)) {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify({
        appointmentNote,
        appointmentDate,
        appointmentAddress,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/appointments');
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.appointment-form')
  .addEventListener('submit', newappointmentFormHandler);
