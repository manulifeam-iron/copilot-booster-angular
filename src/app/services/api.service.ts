import { Injectable } from '@angular/core';
import { Doctor, Patient, Appointment } from '../../type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = environment.apiUrl;
  private readonly headers = {
    Authorization: 'Basic YWxseW91cmJhc2U6YXJlYmVsb25ndG91cw==',
  };

  async getPatients(): Promise<Patient[]> {
    const response = await fetch(`${this.url}/patients`, {
      headers: this.headers,
    });
    const data = await response.json();
    return data._embedded.patients ?? null;
  }

  async getDoctors(): Promise<Doctor[]> {
    const response = await fetch(`${this.url}/doctors`, {
      headers: this.headers,
    });
    const data = await response.json();
    // Doctor objects now include telephone and email
    return data._embedded.doctors ?? null;
  }
  async getDoctorById(id: string): Promise<Doctor | null> {
    const response = await fetch(`${this.url}/doctors/${id}`, {
      headers: this.headers,
    });
    const data = await response.json();
    // Doctor object now includes telephone and email
    return data ?? null;
  }
  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${this.url}/appointments`, {
      headers: this.headers,
    });
    const data = await response.json();
    const appointments = data._embedded?.appointments ?? [];
    
    // Map the appointments and fetch doctor/patient names
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (appointment: any) => {
        const doctorName = await this.getDoctorNameFromLink(appointment._links.doctor.href);
        const patientName = await this.getPatientNameFromLink(appointment._links.patient.href);
        
        return {
          ...appointment,
          doctor: doctorName,
          patient: patientName,
          id: appointment._links.self.href.split('/').pop()
        };
      })
    );
    
    return appointmentsWithDetails;
  }
  
  async createAppointment(appointmentData: {
    doctorId: string;
    patientId: string;
    scheduledTime: string;
    notes: string;
  }): Promise<Appointment | null> {
    try {
      const response = await fetch(`${this.url}/appointments`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create appointment: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
  
  private async getDoctorNameFromLink(href: string): Promise<string> {
    try {
      const response = await fetch(href, {
        headers: this.headers,
      });
      const doctor = await response.json();
      return doctor.name || 'Unknown Doctor';
    } catch (error) {
      console.error('Error fetching doctor:', error);
      return 'Unknown Doctor';
    }
  }
  
  private async getPatientNameFromLink(href: string): Promise<string> {
    try {
      const response = await fetch(href, {
        headers: this.headers,
      });
      const patient = await response.json();
      return patient.name || 'Unknown Patient';
    } catch (error) {
      console.error('Error fetching patient:', error);
      return 'Unknown Patient';
    }
  }
}
