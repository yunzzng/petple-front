import { useEffect, useState } from "react";
import config from "@/consts/env.config";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapLoader = ({ onLoad }: { onLoad: () => void }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded || (window.kakao && window.kakao.maps)) {
      onLoad();
      return;
    }

    // 카카오 지도 API 스크립트
    const script = document.createElement("script");
    script.src = `${config.map.KAKAO_API_URL}${config.map.KAKAO_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsScriptLoaded(true);
        onLoad();
      });
    };


    document.head.appendChild(script);
  }, [onLoad]);

  return null;
};

export default MapLoader;