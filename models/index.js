const User = require('./user');
const Pet = require('./pet');
const Notes = require('./notes');
const Appointments = require('./appointments');
const Vaccinations = require('./vaccinations');
const Exercise = require('./exercise'); 

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id',
});

Pet.hasMany(Notes, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Notes.belongsTo(Pet, {
    foreignKey: 'pet_id',
});

Pet.hasMany(Appointments, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Appointments.belongsTo(Pet, {
    foreignKey: 'pet_id,'
});

Pet.hasMany(Vaccinations, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Vaccinations.belongsTo(Pet, {
    foreignKey: 'pet_id,'
});

Pet.hasMany(Exercise, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Exercise.belongsTo(Pet, {
    foreignKey: 'pet_id,'
});

module.exports = { User, Pet, Notes, Appointments, Exercise, Vaccinations };
