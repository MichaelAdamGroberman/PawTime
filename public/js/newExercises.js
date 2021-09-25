 const newexerciseFormHandler = async (event) => {
   event.preventDefault();

   const request = {
     exerciseDate: getFieldValue("exerciseDateInput"),
     exerciseTime: getFieldValue("exerciseTimeInput"),
     exerciseDescription: getFieldValue("exerciseDescriptionInput"),
     exerciseDuration: getFieldValue("exerciseDurationInput"),
     petId: getFieldValue("petId")
   };

   if (request.exerciseDate && request.exerciseTime && request.exerciseDescription && request.exerciseDuration) {
     const response = await fetch('/api/exercises', {
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
       alert(JSON.stringify(response));
     }
   }
 };

 document
   .querySelector('.exercise-form')
   .addEventListener('submit', newexerciseFormHandler);