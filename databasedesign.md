* The database models have the following fields and associations:

  * `User`
    * `id`: primary key
    * `name`
    * `email`
    * `password` ?? or in another table to prevet SQL injections
    * `LocationZip`
    * `status`

  * `Pet`
    * `id`: primary key
    * `name`
    * `type`
    * `breed`
    * `date_of_birth`
    * `user_id`: foreign key that references `User.id`

  * `VetinarianVisits`
    * `id`: primary key
    * `dateTime`
    * `Location`
    * `description`
    * `pet_id`: foreign key that references `Pet.id`

  * `Excercise`
    * `id`: primary key
    * `dateTime`
    * `description`
    * `duration`
    * `pet_id`: foreign ket that references `Pet.id`

  * `Notes`
    * `id`: primary key
    * `Description`
    * `Date`
    * `pet_id`: foreign key that references `Pet.id`

  * Users have many pets, and pets belong to a user.
  * Pets have many vaccinations, vetinarian visits, excercise, and notes.

    * If a user is deleted, all associated pets are also deleted.
    * If a pet is deleted, all associated notes, excercises, and vet visits are deleted

---