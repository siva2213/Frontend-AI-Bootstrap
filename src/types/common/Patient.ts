/**
 * Patient Type Definition
 *
 * Represents patient data structure for the Dashboard table
 */

export type PatientStatus = 'active' | 'pending' | 'completed' | 'cancelled';

export interface Patient {
  id: string;
  name: string;
  status: PatientStatus;
  dateOfBirth: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment?: string;
  primaryPhysician: string;
}
