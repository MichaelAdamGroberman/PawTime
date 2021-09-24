const exerciseDescriptionEl = document.querySelector(
  '#exerciseDescriptionInput'
);
exerciseDescriptionEl.addEventListener('change', function (e) {
  exerciseDescription = e.target.value;
  console.log(e.target.value);
});

const exerciseDateEl = document.querySelector('#exerciseDateInput');
exerciseDateEl.addEventListener('change', function (e) {
  exerciseDate = e.target.value;
  console.log(e.target.value);
});

const exerciseDurationEl = document.querySelector('#exerciseDurationInput');
exerciseDurationEl.addEventListener('change', function (e) {
  exerciseDuration = e.target.value;
  console.log(e.target.value);
});

const newexerciseFormHandler = async (event) => {
  event.preventDefault();

  if ((exerciseDescription, exerciseDate, exerciseDuration)) {
    const response = await fetch('/api/exercises', {
      method: 'POST',
      body: JSON.stringify({
        exerciseDescription,
        exerciseDate,
        exerciseDuration,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/exercises');
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.exercise-form')
  .addEventListener('submit', newexerciseFormHandler);
