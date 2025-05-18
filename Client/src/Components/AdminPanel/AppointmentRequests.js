import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const AppointmentRequests = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:4000/appointments/all');
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const formatTimeAgo = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/appointments/status/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update appointment status');
            }

            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:4000/appointments/cancel/${appointmentId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete appointment');
            }

            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredAppointments = selectedStatus === 'all'
        ? appointments
        : appointments.filter(appointment => appointment.status === selectedStatus);

    return (
        <div>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <select
                    className="req-filter-selection"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="all">All Appointments</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : filteredAppointments.length > 0 ? (
                <div className="appointments-grid">
                    {filteredAppointments.map((appointment) => (
                        <div key={appointment._id} className="appointment-card">
                            <h3>{appointment.petName}</h3>
                            <p><strong>Owner:</strong> {appointment.ownerName}</p>
                            <p><strong>Email:</strong> {appointment.email}</p>
                            <p><strong>Phone:</strong> {appointment.phone}</p>
                            <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                            <p><strong>Reason:</strong> {appointment.reason}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                            <p><strong>Booked:</strong> {formatTimeAgo(appointment.createdAt)}</p>
                            
                            <div className="appointment-actions">
                                {appointment.status === 'Pending' && (
                                    <button 
                                        className="confirm-btn"
                                        onClick={() => handleStatusChange(appointment._id, 'Confirmed')}
                                    >
                                        Confirm
                                    </button>
                                )}
                                {appointment.status === 'Confirmed' && (
                                    <button 
                                        className="complete-btn"
                                        onClick={() => handleStatusChange(appointment._id, 'Completed')}
                                    >
                                        Mark Complete
                                    </button>
                                )}
                                {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                                    <button 
                                        className="cancel-btn"
                                        onClick={() => handleStatusChange(appointment._id, 'Cancelled')}
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(appointment._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No appointments found</p>
            )}
        </div>
    );
};

export default AppointmentRequests;