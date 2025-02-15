export interface MedicalFacility {
  name: string;
  lat: number | null;
  lng: number | null;
  businessState?: string;
  phone?: string | null;
  roadAddress: string;
  lotAddress: string;
}