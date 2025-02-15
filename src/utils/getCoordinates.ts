import axios from "axios";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

// 공공데이터는 상세주소로 알려줌
// 상세주소 등 포함되면 변환이 안됨
const cleanAddress = (address: string): string => {
  return address
    .split(/,\s|\(/)[0] // "쉼표(,) 또는 괄호 앞" 기준으로 주소를 자름
    .trim(); // 앞뒤 공백 제거
};

// 카카오 주소 → 좌표 변환
// https://developers.kakao.com/docs/latest/ko/local/dev-guide
const getCoordinatesFromKakao = async (address: string) => {
  try {
    const cleanedAddress = cleanAddress(address);

    // 주소가 없거나 잘랐을 때 주소가 사라질수도 있음
    if (!cleanedAddress) {
      return null;
    }

    const response = await axios.get("/kakao/v2/local/search/address.json", {
      params: { query: cleanedAddress },
      headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
    });

    if (response.data.documents.length > 0) {
      const { x, y } = response.data.documents[0];
      return { lat: parseFloat(y), lng: parseFloat(x) };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
export default getCoordinatesFromKakao;