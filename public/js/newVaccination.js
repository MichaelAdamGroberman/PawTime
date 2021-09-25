const newvaccinationFormHandler = async (event) => {
  event.preventDefault();
  const request = {
    vaccinationName: getFieldValue("vaccinationNameInput"),
    vaccinationDate: getFieldValue("vaccinationDateInput"),
    vaccinationTime: getFieldValue("vaccinationTimeInput"),
    petId: getFieldValue("petId")
  };
  if (request.vaccinationName && request.vaccinationDate && request.vaccinationTime) {
    const response = await fetch('/api/vaccinations', {
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
  .querySelector('.vaccination-form')
  .addEventListener('submit', newvaccinationFormHandler);