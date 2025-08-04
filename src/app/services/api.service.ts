import { Injectable } from '@angular/core';
import { Doctor, Patient } from '../../type';
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
    return data._embedded.doctors ?? null;
  }

  async getDoctorById(id: string): Promise<Doctor | null> {
    const response = await fetch(`${this.url}/doctors/${id}`, {
      headers: this.headers,
    });
    const data = await response.json();
    return data ?? null;
  }
}
