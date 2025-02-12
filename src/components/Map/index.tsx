import { useEffect, useRef, useState } from "react";
import MapLoader from "./MapLoader";
import markerImg from "/images/marker.png";
import styles from "./map.module.css";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const container = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로딩 상태

  useEffect(() => {
    if (!isMapLoaded || !window.kakao || !window.kakao.maps) return;

    // 기본위치: 카카오
    const position = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position,
      level: 3,
    };

    const map = new window.kakao.maps.Map(container.current, options);

    // 마커 이미지 설정
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });

    marker.setMap(map);
  }, [isMapLoaded]);

  return (
    <>
      <MapLoader onLoad={() => setIsMapLoaded(true)} />
      <div id="map" className={styles.mapContainer} ref={container}></div>
    </>
  );
};

export default Map;