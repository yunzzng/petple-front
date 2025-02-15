import { MedicalFacility } from "@/types/medical.type";
import baseInstance from "./axios";
import getCoordinatesFromKakao from "@/utils/getCoordinates";

const GYEONGGI_API_KEY = import.meta.env.VITE_OPEN_GYEONGGI_API_KEY;
const SEOUL_API_KEY = import.meta.env.VITE_OPEN_SEOUL_API_KEY;
const BASE_URL_GYEONGGI = import.meta.env.VITE_BASE_URL_GYEONGGI;
const BASE_URL_SEOUL = import.meta.env.VITE_BASE_URL_SEOUL;

// 경기도
const fetchGyeonggiData = async (type: "Animalhosptl" | "AnimalPharmacy"): Promise<MedicalFacility[]> => {
  const response = await baseInstance.get(`${BASE_URL_GYEONGGI}/${type}`, {
    params: {
      KEY: GYEONGGI_API_KEY,
      Type: "json",
      pIndex: 1,
    },
  });

  const data = response.data?.[type]?.[1]?.row || [];
  return data.map((item: any) => ({
    name: item.BIZPLC_NM, // 병원/약국 이름
    lat: parseFloat(item.REFINE_WGS84_LAT) || null, // 위도
    lng: parseFloat(item.REFINE_WGS84_LOGT) || null, // 경도
    businessState: item.BSN_STATE_NM, // 영업 상태
    phone: item.LOCPLC_FACLT_TELNO || null, // 전화번호
    roadAddress: item.REFINE_ROADNM_ADDR || "", // 도로명 주소
    lotAddress: item.REFINE_LOTNO_ADDR || "", // 지번 주소
  }));
};

// 서울
const fetchSeoulData = async (dataType: "hospital" | "pharmacy"): Promise<MedicalFacility[]> => {
  const endpoint = dataType === "hospital" ? "LOCALDATA_020301" : "LOCALDATA_020302";

  const response = await baseInstance.get(`${BASE_URL_SEOUL}/${SEOUL_API_KEY}/json/${endpoint}/1/100`, {
    params: {
      KEY: SEOUL_API_KEY,
      Type: "json",
      pIndex: 1,
    },
  });

  const data = response.data?.[endpoint]?.row || [];

  // 카카오 API로 위도/경도 먼저 변환해야됨
  // Promise.all 사용이유: 안쓰면 데이터 하나씩 API 요청해야됨
  return Promise.all(
    data.map(async (item: any) => {
      const coords = await getCoordinatesFromKakao(item.RDNWHLADDR); // 카카오 API (주소 -> 위도/경도 변환)
      return {
        name: item.BPLCNM, // 병원/약국 이름
        lat: coords ? coords.lat : null, // 위도
        lng: coords ? coords.lng : null, // 경도
        businessState: item.TRDSTATENM, // 영업 상태
        phone: item.SITETEL, // 전화번호
        roadAddress: item.RDNWHLADDR || "", // 도로명 주소
        lotAddress: item.SITEWHLADDR || "", // 지번 주소
      };
    })
  );
};

// 아래 지역 선택 시에만 데이터를 가져오게함
const fetchHospitalData = async (region: string): Promise<MedicalFacility[]> => {
  if (region === "경기") return await fetchGyeonggiData("Animalhosptl");
  if (region === "서울") return await fetchSeoulData("hospital");
  return [];
};

const fetchPharmacyData = async (region: string): Promise<MedicalFacility[]> => {
  if (region === "경기") return await fetchGyeonggiData("AnimalPharmacy");
  if (region === "서울") return await fetchSeoulData("pharmacy");
  return [];
};

export { fetchHospitalData, fetchPharmacyData };