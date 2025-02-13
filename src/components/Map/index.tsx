import { FC, useEffect, useRef } from "react";
import markerImg from "/images/marker.png";
import styles from "./map.module.css";
import useKakaoLoader from "./MapLoader";

interface MapProps {
  locations?: { lat: number; lng: number; name: string }[];
}

const Map: FC<MapProps> = ({ locations = [] }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { isSuccess } = useKakaoLoader();

  useEffect(() => {
    if (!isSuccess || !window.kakao || !window.kakao.maps || !container.current) return;

    // 지도 기본 설정
    const position = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const options = { center: position, level: 4 };

    const map = new window.kakao.maps.Map(container.current, options);

    // 마커 이미지 설정
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

    // 마커 추가
    locations?.forEach((loc) => {
      const markerPosition = new window.kakao.maps.LatLng(loc.lat, loc.lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);
    });

  }, [isSuccess, locations]);

  return <div id="map" className={styles.mapContainer} ref={container}></div>;
};

export default Map;