import baseInstance from "./axios";

const API_KEY = import.meta.env.VITE_OPEN_API_KEY;
const BASE_URL = "https://openapi.gg.go.kr";

interface Hospital {
  BIZPLC_NM: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
  LICENSG_DE?: string;
  BSN_STATE_NM?: string;
  CLSBIZ_DE?: string;
  LOCPLC_FACLT_TELNO?: string;
  LOCPLC_ZIP_CD?: string;
  REFINE_ROADNM_ADDR?: string;
  REFINE_LOTNO_ADDR?: string;
}

interface Pharmacy {
  BIZPLC_NM: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
  LICENSG_DE?: string;
  BSN_STATE_NM?: string;
  CLSBIZ_DE?: string;
  LOCPLC_FACLT_TELNO?: string;
  LOCPLC_ZIP_CD?: string;
  REFINE_ROADNM_ADDR?: string;
  REFINE_LOTNO_ADDR?: string;
}

const fetchHospitalData = async () => {
  const response = await baseInstance.get(`${BASE_URL}/Animalhosptl`, {
    params: {
      KEY: API_KEY,
      Type: "json",
      pIndex: 1,
      pSize: 5
    },
  });

  const hospitalData = response.data.Animalhosptl?.[1]?.row

  return hospitalData.map((item: Hospital) => ({
    name: item.BIZPLC_NM,
    lat: parseFloat(item.REFINE_WGS84_LAT),
    lng: parseFloat(item.REFINE_WGS84_LOGT),
    licenseDate: item.LICENSG_DE, 
    businessState: item.BSN_STATE_NM,
    closeDate: item.CLSBIZ_DE,
    phone: item.LOCPLC_FACLT_TELNO,
    zipCode: item.LOCPLC_ZIP_CD,
    roadAddress: item.REFINE_ROADNM_ADDR,
    lotAddress: item.REFINE_LOTNO_ADDR,
  })) || [];
};

const fetchPharmacyData = async () => {
  const response = await baseInstance.get(`${BASE_URL}/AnimalPharmacy`, {
    params: {
      KEY: API_KEY,
      Type: "json",
      pIndex: 1,
      pSize: 5
    },
  });

  const pharmacyData = response.data.AnimalPharmacy?.[1]?.row

  return pharmacyData.map((item: Pharmacy) => ({
    name: item.BIZPLC_NM,
    lat: parseFloat(item.REFINE_WGS84_LAT),
    lng: parseFloat(item.REFINE_WGS84_LOGT),
    licenseDate: item.LICENSG_DE, 
    businessState: item.BSN_STATE_NM,
    closeDate: item.CLSBIZ_DE,
    phone: item.LOCPLC_FACLT_TELNO,
    zipCode: item.LOCPLC_ZIP_CD,
    roadAddress: item.REFINE_ROADNM_ADDR,
    lotAddress: item.REFINE_LOTNO_ADDR,
  })) || [];
};

export { fetchHospitalData, fetchPharmacyData };