import { useQuery } from "@tanstack/react-query";
import config from "@/consts/env.config";

declare global {
  interface Window {
    kakao: any;
  }
}

const loadKakaoMap = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `${config.map.KAKAO_API_URL}${config.map.KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve(true));
    };

    script.onerror = () => reject(new Error("Kakao Maps API 로드 실패"));
    document.head.appendChild(script);
  });
};

const useKakaoLoader = () => {
  return useQuery<boolean, Error>({
    queryKey: ["kakaoMap"],
    queryFn: loadKakaoMap,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });
};

export default useKakaoLoader;