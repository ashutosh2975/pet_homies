const express = require('express');
const router = express.Router();
const { 
    createAppointment, 
    getAllAppointments, 
    updateAppointmentStatus, 
    deleteAppointment 
} = require('../Controller/AppointmentController');

// Create a new appointment
router.post('/book', createAppointment);
// Get all appointments
router.get('/all', getAllAppointments);
// Update appointment status (confirm/cancel/complete)
router.put('/status/:id', updateAppointmentStatus);
// Delete appointment
router.delete('/cancel/:id', deleteAppointment);

module.exports = router;