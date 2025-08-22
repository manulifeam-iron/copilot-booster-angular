export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  address: Address;
  dob: string;
  telephone: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
}

export interface Appointment {
  id?: string;
  scheduledTime: string;
  notes: string;
  _links: {
    self: { href: string };
    appointment: { href: string };
    patient: { href: string };
    doctor: { href: string };
  };
  // Optional fields for display purposes
  doctor?: string;
  patient?: string;
}
