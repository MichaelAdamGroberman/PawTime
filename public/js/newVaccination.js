const vaccinationNameEl = document.querySelector('#vaccinationNameInput');
vaccinationNameEl.addEventListener('change', function (e) {
  vaccinationName = e.target.value;
  console.log(e.target.value);
});

const vaccinationDateEl = document.querySelector('#vaccinationDateInput');
vaccinationDateEl.addEventListener('change', function (e) {
  vaccinationDate = e.target.value;
  console.log(e.target.value);
});

const newvaccinationFormHandler = async (event) => {
  event.preventDefault();

  if ((vaccinationName, vaccinationDate)) {
    const response = await fetch('/api/vaccinations', {
      method: 'POST',
      body: JSON.stringify({ vaccinationName, vaccinationDate }),
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
