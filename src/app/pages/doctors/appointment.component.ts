import { Component, computed, inject, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor, Patient } from '../../../type';

@Component({
  selector: 'app-appointment',
  imports: [
    FooterComponent,
    DatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment.component.html',
})
export class AppointmentComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle("Appointments");
    this.meta.updateTag({
      name: 'description',
      content:
        "Appointments List",
    });
    this.meta.updateTag({ property: 'og:title', content: "Appointments" });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Appointments List",
    });
  }
  private readonly apiService = inject(ApiService);

  // Modal state
  isModalOpen = signal(false);
  isSubmitting = signal(false);

  // Form for creating new appointments
  appointmentForm = new FormGroup({
    doctorId: new FormControl('', [Validators.required]),
    patientId: new FormControl('', [Validators.required]),
    scheduledTime: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required])
  });

  // Data for dropdowns
  doctors = resource({
    loader: () => this.apiService.getDoctors(),
  });

  patients = resource({
    loader: () => this.apiService.getPatients(),
  });

  appointments = resource({
    loader: () => this.apiService.getAppointments(),
  });

  isLoading = computed(() => this.appointments.isLoading());

  // Modal methods
  openModal() {
    this.isModalOpen.set(true);
    this.appointmentForm.reset();
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.appointmentForm.reset();
  }

  async onSubmit() {
    if (this.appointmentForm.valid) {
      this.isSubmitting.set(true);
      
      try {
        const formValue = this.appointmentForm.value;
        await this.apiService.createAppointment({
          doctorId: formValue.doctorId!,
          patientId: formValue.patientId!,
          scheduledTime: formValue.scheduledTime!,
          notes: formValue.notes!
        });

        // Refresh the appointments list
        this.appointments.reload();
        
        // Close modal and reset form
        this.closeModal();
      } catch (error) {
        console.error('Error creating appointment:', error);
        // You could add a notification here
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}
