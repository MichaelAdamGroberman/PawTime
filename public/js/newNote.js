const newnoteeFormHandler = async (event) => {
  event.preventDefault();

  const request = {
    noteDate: toDateString(new Date()), //  getFieldValue("noteDateInput"),
    noteTime: toTimetring(new Date()), // getFieldValue("noteTimeInput"),
    noteTitle: getFieldValue("noteTitleInput"),
    noteDescription: getFieldValue("noteDescriptionInput"),
    petId: getFieldValue("petId")
  };

  if (request.noteDate && request.noteTime && request.noteTitle && request.noteDescription) {

    const response = await fetch('/api/notes', {
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
  .querySelector('.note-form')
  .addEventListener('submit', newnoteeFormHandler);