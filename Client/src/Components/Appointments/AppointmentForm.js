import React, { useState } from 'react';
import { format } from 'date-fns';

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        petName: '',
        ownerName: '',
        email: '',
        phone: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(formData.email)) {
            setError('Please provide a valid email address');
            return;
        }

        if (Object.values(formData).some(value => !value)) {
            setError('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:4000/appointments/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to book appointment');
            }

            setShowPopup(true);
            setFormData({
                petName: '',
                ownerName: '',
                email: '',
                phone: '',
                appointmentDate: '',
                appointmentTime: '',
                reason: ''
            });
        } catch (err) {
            setError('Failed to book appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="appointment-form-container">
            <h2>Book a Veterinary Appointment</h2>
            <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-group">
                    <label>Pet's Name:</label>
                    <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Owner's Name:</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Appointment Date:</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Preferred Time:</label>
                    <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Reason for Visit:</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button>
            </form>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Appointment Booked Successfully!</h3>
                        <p>We will send you a confirmation email shortly.</p>
                        <button onClick={() => setShowPopup(false)} className="close-btn">
                            Close <i className="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentForm;