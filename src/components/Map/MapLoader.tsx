import { useQuery } from "@tanstack/react-query";
import config from "@/consts/env.config";

const KAKAO_MAP_SCRIPT_ID = "kakao-map-script";

const loadKakaoMap = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // 지도 API가 로드된 상태
    if (window.kakao && window.kakao.maps) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = `${config.map.KAKAO_API_URL}${config.map.KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve(true));
    };

    script.onerror = () => reject(new Error("Kakao Maps API 로드 실패"));

    document.head.appendChild(script);
  });
};

// 클린업 추가
const cleanupKakaoScript = () => {
  const script = document.getElementById(KAKAO_MAP_SCRIPT_ID);
  if (script) {
    document.head.removeChild(script);
  }
};

const useKakaoLoader = () => {
  const query = useQuery<boolean, Error>({
    queryKey: ["kakaoMap"],
    queryFn: loadKakaoMap,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7일 동안 캐싱 유지
  });

  return { ...query, cleanup: cleanupKakaoScript };
};

export default useKakaoLoader;