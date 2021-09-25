function getFieldValue(id) {
  const el = document.querySelector('#' + id);
  return el.value;
}

function toDateString(dt) {
  var dtVal = new Date(dt);
  var year = dtVal.getFullYear();
  var month = String(dtVal.getMonth() + 1).padStart(2, '0'); // '09'
  var date = String(dtVal.getDate()).padStart(2, '0'); // '09'
  //Format eg:20210921      
  return `${year}-${month}-${date}`;
}

function toTimetring(dt) {
  var dtVal = new Date(dt);
  var hrs = String(dtVal.getHours()).padStart(2, '0'); // '09'
  var min = String(dtVal.getMinutes() + 1).padStart(2, '0'); // '09'
  var sec = String(dtVal.getSeconds()).padStart(2, '0'); // '09'
  //Format eg:20210921      
  return `${hrs}:${min}:${sec}`;
}

//////////////////////////////////////////////////////////////
async function deleteAppointment(id)
{
  if(confirm("Are you sure to delete this appointment?")){
    const response = await fetch('/api/appointments/' +  id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
  return;
}

//////////////////////////////////////////////////////////////
async function deleteVaccinaton(id)
{
  if(confirm("Are you sure to delete this vaccinaton?")){
    const response = await fetch('/api/vaccinations/' +  id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
  return;
}

//////////////////////////////////////////////////////////////
async function deleteNote(id)
{
  if(confirm("Are you sure to delete this note?")){
    const response = await fetch('/api/notes/' +  id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
  return;
}
//////////////////////////////////////////////////////////////
async function deleteExercise(id)
{
  if(confirm("Are you sure to delete this exercise?")){
    const response = await fetch('/api/exercises/' +  id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
  return;
}
//////////////////////////////////////////////////////////////
async function deletePet(id)
{
  if(confirm("Are you sure to delete this pet?" + id)){
    const response = await fetch('/api/pets/' +  id, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // TODO: change it to enter all values
      alert(response.statusText);
    }
  }
  return;
}