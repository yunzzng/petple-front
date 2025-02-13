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

    const defaultPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const options = { center: defaultPosition, level: 12 };

    const map = new window.kakao.maps.Map(container.current, options);

    // 마커 이미지 설정
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

    // 기본 마커
    if (locations.length === 0) {
      const marker = new window.kakao.maps.Marker({
        position: defaultPosition,
        image: markerImage,
      });
      marker.setMap(map);
    }

    // 사용자 선택
    if (locations.length > 0) {
      locations.forEach((location) => {
        const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
    }
  }, [isSuccess, locations]);

  return <div id="map" className={styles.mapContainer} ref={container}></div>;
};

export default Map;