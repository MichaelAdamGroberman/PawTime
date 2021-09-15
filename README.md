# PawTime
A web application that stores a personal profile for your pet(s). Each pet has their vaccinations, issues, appointments, etc logged. Future releases will include integration with Rover to schedule pet sitting/walking, Veterinary Visit Scheduling, and connects you to similar pet owners based on geolocation, pet needs, activities, etc.

## User Stories
* As a user, I want to be able to create an account in PawTime.

* As a registered user, I should be able to login using my email id and password registered with PawTime.

* As a user, I should be able to add all my pets information (dogs and cats).

* As a user, I want to see a list of my pets after I log in.

## Acceptance Criteria

```md
GIVEN PawTime website
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes news about pets; navigation links for the homepage, a sign up page and the option to log in

WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on sign up link in the navigation
THEN I am prompted to create an account by entering the following fields
    - username, email id and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to log in
THEN I am prompted to enter my email id and password
WHEN I am signed in to the site
THEN I see navigation links for
    - the my pets' page,
    - the my profile page, 
    - the option to log out
WHEN I click on the my pets' option in the navigation
THEN I am taken to the my pets' page and presented with 
    - button to add new pet
    - existing list of pets
    - button to edit information of existing pets
WHEN I click on an existing pet's picture
THEN I am presented with the more details about the pet
    - which includes pictures of pet
    - name of the pet 
    - type of pet (cat or dog) and breed
    - pet's facebook link 
    - pet's date of birth
    - pet's vaccination information 
    - pet's bio
WHEN I click on the button to add a new pet
THEN I am prompted to enter the following details of new pet
    - name of the pet 
    - type of pet (cat or dog) and breed
    - pet's facebook link 
    - pet's date of birth
    - pet's vaccination information 
    - pet's bio
WHEN I click on the button to save 
THEN all the pet's information is saved and I am taken back to my pets page 
WHEN I click on edit button in one of my pet's information in my pets page 
THEN I am able to delete or update my pet's information and taken back to an updated my pet's page

WHEN I click on the my profile option in the navigation
THEN I am taken to the my profile page and presented with the following fields and option to edit some of the fields
    - my username (read only)
    - my email id (read only)
    - my full name
    - my city, state, country
    - my bio
WHEN I click on the button to save 
THEN all my profile's information is saved and I am taken back to my pet's page 

WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am signed out of the site automatically 
```
