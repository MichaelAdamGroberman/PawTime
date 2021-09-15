* The database models have the following fields and associations:

  * `User`
    * `id`: primary key
    * `name`
    * `email`
    * `password`
    * `bio`

  * `Pet`
    * `id`: primary key
    * `name`
    * `type`
    * `breed`
    * `fb_link`
    * `date_of_birth`
    * `vaccination_details`
    * `description`
    * `user_id`: foreign key that references `User.id`

  * Users have many pets, and pets belong to a user.

    * If a user is deleted, all associated pets are also deleted.

---