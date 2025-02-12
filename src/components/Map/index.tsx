import { useEffect, useRef } from "react";
import markerImg from "/images/marker.png";
import styles from "./map.module.css";
import useKakaoLoader from "./MapLoader";

const Map = () => {
  const container = useRef<HTMLDivElement | null>(null);
  
  // TanStack Query로 Kakao 지도 로드
  const { isSuccess } = useKakaoLoader();

  useEffect(() => {
    if (!isSuccess || !window.kakao || !window.kakao.maps || !container.current) return;

    // 지도 기본 설정
    const position = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const options = { center: position, level: 3 };

    const map = new window.kakao.maps.Map(container.current, options);

    // 마커 설정
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);
    const marker = new window.kakao.maps.Marker({ position, image: markerImage });

    marker.setMap(map);
  }, [isSuccess]);

  return <div id="map" className={styles.mapContainer} ref={container}></div>;
};

export default Map;