export interface Traveler {
  id: string;
  passportNumber: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  entryDate: string;
  entryPort: string;
  entryLocation: string;
  entryReason: string;
  maxStayDays: number;
  maxStayDate: string; // Calculated: entryDate + maxStayDays
  exitDate?: string;
  exitLocation?: string;
}

export interface TravelerFormData {
  passportNumber: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  entryDate: string;
  entryPort: string;
  entryLocation: string;
  entryReason: string;
  maxStayDays: number;
  exitDate?: string;
  exitLocation?: string;
}
