export interface MedicalService {
  name: string;
  lat: number | null;
  lng: number | null;
  businessState?: string;
  phone?: string | null;
  roadAddress: string;
  lotAddress: string;
}

export interface FuneralService {
  name: string;
  lat: number;
  lng: number;
  phone?: string;
  zipCode?: string;
  roadAddress?: string;
  lotAddress?: string;
}

export interface PlaceInfo {
  id: string;
  title: string;
  address: string;
  tel: string;
  imageUrl: string;
}