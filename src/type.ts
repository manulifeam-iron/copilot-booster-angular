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
}

export interface Patient {
  id: string;
  name: string;
}
