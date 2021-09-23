const newvaccinationFormHandler = async (event) => {
  event.preventDefault();

  const details = document.querySelector('#vaccinationDetails').value.trim();

  console.log(details);

  const date = document.querySelector('#vaccinationDate').value.trim();

  console.log(date);

  if ((details, date)) {
    const response = await fetch('/api/vaccinations', {
      method: 'POST',
      body: JSON.stringify({ name, gender, type, breed }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);
    console.log(err);

    if (response.ok) {
      document.location.replace('/petpage');
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.vaccination-form')
  .addEventListener('submit', newVaccinationFormHandler);
