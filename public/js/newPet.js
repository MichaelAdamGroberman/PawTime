const petGenderEl = document.querySelector('#petGenderSelect');
let petGender = 'Male';
petGenderEl.addEventListener('change', function (e) {
  petGender = e.target.value;
  console.log(e.target.value);
});
console.log(petGender);

const petTypeEl = document.querySelector('#petTypeSelect');
let petType = 'Dog';
petTypeEl.addEventListener('change', function (e) {
  petType = e.target.value;
  console.log(e.target.value);
});
console.log(petType);

const petNameEl = document.querySelector('#petNameInput');
petNameEl.addEventListener('change', function (e) {
  petName = e.target.value;
  console.log(e.target.value);
});
const petBreedEl = document.querySelector('#petBreedInput');
petBreedEl.addEventListener('change', function (e) {
  petBreed = e.target.value;
  console.log(e.target.value);
});

const newPetFormHandler = async (event) => {
  event.preventDefault();
  console.log('hello');
  if ((petName, petGender, petType, petBreed)) {
    const response = await fetch('/api/pets', {
      method: 'POST',
      body: JSON.stringify({ petName, petGender, petType, petBreed }),
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
