export type HealthStatusTier = 'Normal' | 'Monitor' | 'Attention' | 'Critical';

export interface VitalMetric {
  id: string;
  name: string;
  value: string;
  numericValue: number;
  unit: string;
  status: HealthStatusTier;
  normalRange: string;
  lastUpdated: string;
  trend: 'improving' | 'stable' | 'elevated' | 'declining';
  history: number[];
  icon: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  category: string;
  isConnected: boolean;
  batteryPct: number;
  lastSynced: string;
  dataType: string;
  iconName: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  primaryPhysician: string;
}

export interface MedicalHistoryItem {
  id: string;
  category: 'Condition' | 'Allergy' | 'Procedure' | 'Family History';
  title: string;
  detail: string;
  yearDiagnosed: string;
  status: string;
}

export interface DiagnosisRecord {
  id: string;
  diagnosis: string;
  date: string;
  doctor: string;
  clinic: string;
  status: 'Active' | 'Resolved' | 'Monitoring';
  notes: string;
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  result: string;
  normalRange: string;
  status: 'Normal' | 'Elevated' | 'Attention' | 'Pending';
  laboratory: string;
}

export interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  timeOfDay: string;
  duration: string;
  prescribedBy: string;
  reminderActive: boolean;
  takenToday: boolean;
  instructions: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Consultation' | 'Lab Follow-Up';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  reason: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'Clinic' | 'Hospital' | 'Pharmacy' | 'Laboratory' | 'Emergency Facility';
  address: string;
  openHours: string;
  phone: string;
  distanceKm: number;
  estimatedMins: number;
  rating: number;
  coords: { x: number; y: number };
  shortestRouteCoords: { x: number; y: number }[];
  alternativeRouteCoords: { x: number; y: number }[];
  services: string[];
}

export interface AppNotification {
  id: string;
  type: 'success' | 'alert' | 'reminder' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ClinicPatientRow {
  patientId: string;
  name: string;
  age: number;
  heartRate: number;
  spo2: number;
  bloodPressure: string;
  riskLevel: 'Normal' | 'Watch' | 'High Attention';
  priorityScore: number;
  lastUpdated: string;
}

export interface ClinicResourceItem {
  name: string;
  used: number;
  total: number;
  percentage: number;
  unit: string;
  status: 'Optimal' | 'High Load' | 'Critical';
}
