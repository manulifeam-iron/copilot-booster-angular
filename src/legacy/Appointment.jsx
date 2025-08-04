import React, { useState, useEffect } from 'react';
import apiService from '../apiService'; // adjust path as needed

export default function Appointment() {
    const [viewAppointments, setViewAppointments] = useState([]);

    useEffect(() => {
        apiService.getAppointments().then(data => {
            setViewAppointments(data);
        });
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto' }}>
            <h2>Appointments</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Doctor</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Patient</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date & Time</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {viewAppointments.map(app => (
                        <tr key={app.id}>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.doctor}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.patient}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                {new Date(app.date).toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}