const router = require('express').Router();
const {
    Appointments,
    Pet,
    User
} = require('../../models');
const {
    sendEventEmail
} = require('../../utils/emailEvent');

// Common function to get all details related to an appointment
// and prepare the data for sending the email
async function sendEventEmailToUser(apptId) {
    const appt = await Appointments.findByPk(apptId);
    const pet = await Pet.findByPk(appt.pet_id);
    const user = await User.findByPk(pet.user_id);

    //Call function for sending email
    const eventDetails = {
        "date": appt.date,
        "time": appt.time,
        "address": appt.address,
        "notes": appt.notes,
        "pet_id": appt.pet_id,
        "user_email": user.email,
        "pet_name": pet.name
    };

    sendEventEmail(eventDetails);
}

// Route for creating the new appointment information
router.post('/', async (req, res) => {
    try {
        const appointment = await Appointments.create({
            date: req.body.appointmentDate,
            time: req.body.appointmentTime,
            address:  req.body.appointmentAddress,
            notes: req.body.appointmentNote,
            pet_id: req.body.petId
        });
        //Send email when creating a new appointment
        sendEventEmailToUser(appointment.id);
        res.status(200).json(appointment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Route for deleting the existing appointment information
router.delete('/:id', async (req, res) => {
    try {
        const apptData = await Appointments.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!apptData) {
            res.status(404).json({
                message: 'No appointment found with this id!',
            });
            return;
        }

        res.status(200).json(apptData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route for updating the existing appointment information
router.put('/:id', async (req, res) => {
    try {
        const apptData = await Appointments.update({
            ...req.body
        }, {
            where: {
                id: req.params.id,
            },
        });
        if (!apptData) {
            res.status(404).json({
                message: 'No appointment found with this id!',
            });
            return;
        }

        //Send email when updating an existing appointment
        sendEventEmailToUser(req.params.id);

        res.status(200).json(apptData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get specfic appointment using the id
router.get('/:id', async (req, res) => {
    try {
        const apptData = await Appointments.findByPk(req.params.id);
        if (!apptData) {
            res.status(404).json({
                message: 'No appointment found with this id!'
            });
            return;
        }

        const appt = apptData.get({
            plain: true
        });
        res.status(200).json(appt);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all appointments for a pet
router.get('/bypet/:pet_id', async (req, res) => {
    try {
        const petId = req.params.pet_id;
        const apptData = await Appointments.findAll({
            where: {
                pet_id: petId,
            },
            order: [
                ['date', 'ASC']
            ],
        });

        const appts = apptData.map((appt) => appt.get({
            plain: true
        }));
        res.status(200).json(appts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;