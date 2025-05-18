const Appointment = require('../Model/AppointmentModel');
const { sendEmail } = require('../utils/emailService');

const createAppointment = async (req, res) => {
    try {
        const { petName, ownerName, email, phone, appointmentDate, appointmentTime, reason } = req.body;
        const appointment = await Appointment.create({
            petName,
            ownerName,
            email,
            phone,
            appointmentDate,
            appointmentTime,
            reason
        });

        // Send confirmation email
        await sendEmail(
            email,
            'Veterinary Appointment Request Received',
            `Dear ${ownerName},\n\n
            Your veterinary appointment request for ${petName} has been received.\n
            Details:\n
            Date: ${new Date(appointmentDate).toLocaleDateString()}\n
            Time: ${appointmentTime}\n
            Reason: ${reason}\n\n
            We will review your request and send you a confirmation email shortly.\n\n
            Best regards,\npet Homies Veterinary Team`
        );

        res.status(200).json(appointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ appointmentDate: 1 });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Prepare email content based on status
        let emailSubject = '';
        let emailContent = '';

        switch (status) {
            case 'Confirmed':
                emailSubject = 'Veterinary Appointment Confirmed';
                emailContent = `Dear ${appointment.ownerName},\n\n
                Your veterinary appointment for ${appointment.petName} has been confirmed!\n
                Details:\n
                Date: ${new Date(appointment.appointmentDate).toLocaleDateString()}\n
                Time: ${appointment.appointmentTime}\n
                Reason: ${appointment.reason}\n\n
                Please arrive 10 minutes before your scheduled time.\n
                If you need to reschedule, please contact us as soon as possible.\n\n
                Best regards,\npet Homies Veterinary Team`;
                break;

            case 'Cancelled':
                emailSubject = 'Veterinary Appointment Cancelled';
                emailContent = `Dear ${appointment.ownerName},\n\n
                Your veterinary appointment for ${appointment.petName} scheduled for ${new Date(appointment.appointmentDate).toLocaleDateString()} at ${appointment.appointmentTime} has been cancelled.\n\n
                If you would like to reschedule, please book a new appointment through our website.\n\n
                Best regards,\npet Homies Veterinary Team`;
                break;

            case 'Completed':
                emailContent = `Dear ${appointment.ownerName},\n\n
                Thank you for visiting pet Homies Veterinary Clinic with ${appointment.petName}.\n
                We hope your experience was satisfactory.\n
                If you have any questions about your visit or need follow-up care, please don't hesitate to contact us.\n\n
                Best regards,\npet Homies Veterinary Team`;
                break;
        }

        // Send status update email
        if (emailSubject && emailContent) {
            await sendEmail(
                appointment.email,
                emailSubject,
                emailContent
            );
        }

        res.status(200).json(appointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Send cancellation email
        await sendEmail(
            appointment.email,
            'Veterinary Appointment Cancelled',
            `Dear ${appointment.ownerName},\n\n
            Your veterinary appointment for ${appointment.petName} scheduled for ${new Date(appointment.appointmentDate).toLocaleDateString()} at ${appointment.appointmentTime} has been cancelled.\n\n
            If you would like to schedule a new appointment, please visit our website.\n\n
            Best regards,\nPawFinds Veterinary Team`
        );

        res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
};