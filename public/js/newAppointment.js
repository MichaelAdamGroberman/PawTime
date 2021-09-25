const newappointmentFormHandler = async (event) => {
  event.preventDefault();

  const request = {
    appointmentDate: getFieldValue("appointmentDateInput"),
    appointmentTime: getFieldValue("appointmentTimeInput"),
    appointmentNote: getFieldValue("appointmentNoteInput"),
    appointmentAddress: getFieldValue("appointmentAddressInput"),
    petId: getFieldValue("petId")
  };

  if (request.appointmentDate && request.appointmentTime && request.appointmentNote && request.appointmentAddress) {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.appointment-form')
  .addEventListener('submit', newappointmentFormHandler);
  
