import baseInstance from "./axios";

const API_KEY = import.meta.env.VITE_OPEN_API_KEY;
const BASE_URL = "https://openapi.gg.go.kr";

interface FuneralService {
  BIZPLC_NM: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
  REPRSNTV_NM?: string;
  TELNO?: string;
  REFINE_ZIP_CD?: string;
  REFINE_ROADNM_ADDR?: string;
  REFINE_LOTNO_ADDR?: string;
}

const fetchFuneralData = async () => {
  const response = await baseInstance.get(`${BASE_URL}/DoanmalfunrlPrmisnentrp`, {
    params: {
      KEY: API_KEY,
      Type: "json",
      pIndex: 1,
      pSize: 5,
    },
  });

  const funeralData = response.data.DoanmalfunrlPrmisnentrp?.[1]?.row;

  return funeralData.map((item: FuneralService) => ({
    name: item.BIZPLC_NM,
    lat: parseFloat(item.REFINE_WGS84_LAT),
    lng: parseFloat(item.REFINE_WGS84_LOGT),
    representativeName: item.REPRSNTV_NM,
    phone: item.TELNO,
    zipCode: item.REFINE_ZIP_CD,
    roadAddress: item.REFINE_ROADNM_ADDR,
    lotAddress: item.REFINE_LOTNO_ADDR,
  }));
};

export { fetchFuneralData };