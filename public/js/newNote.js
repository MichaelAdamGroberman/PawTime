const noteDescriptionEl = document.querySelector('#noteDescriptionInput');
noteDescriptionEl.addEventListener('change', function (e) {
  noteDescription = e.target.value;
  console.log(e.target.value);
});

const noteTitleEl = document.querySelector('#noteTitleInput');
noteTitleEl.addEventListener('change', function (e) {
  noteTitle = e.target.value;
  console.log(e.target.value);
});

const noteDateEl = document.querySelector('#noteDateInput');
noteDateEl.addEventListener('change', function (e) {
  noteDate = e.target.value;
  console.log(e.target.value);
});

const newnoteeFormHandler = async (event) => {
  event.preventDefault();

  if ((noteDescription, noteTitle, noteDate)) {
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        noteDescription,
        noteTitle,
        noteDate,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/notes');
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.note-form')
  .addEventListener('submit', newnoteeFormHandler);
