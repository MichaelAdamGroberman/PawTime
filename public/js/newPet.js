const newPetFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#petName').value.trim();

  const gender = document.querySelector('#petName').on('click', function () {
    alert(petGender.val());

    console.log(petGender.val());
  });

  const type = document.querySelector('#petType').on('click', function () {
    alert(petType.val());

    console.log(petType.val());
  });

  const breed = document.querySelector('#petBreed').value.trim();

  // QUESTION:
  // const petBirthday = document.querySelector('#petBirthday').value.trim();

  if ((petName, petGender, petType, petBreed)) {
    const response = await fetch('/api/pets', {
      method: 'POST',
      body: JSON.stringify({ name, gender, type, breed }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.new-pet-form')
  .addEventListener('submit', newPetFormHandler);
