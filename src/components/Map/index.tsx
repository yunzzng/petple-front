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
    if (!isSuccess || !window.kakao || !window.kakao.maps || !container.current)
      return;

    // 기본 설정 위치
    const defaultPosition = new window.kakao.maps.LatLng(36.35, 127.384);

    const zoomLevel = locations.length > 0 ? 5 : 14;

    const options = { center: defaultPosition, level: zoomLevel };
    const map = new window.kakao.maps.Map(container.current, options);

    // 마커 이미지 설정
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

    // 사용자 마커 추가
    if (locations.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();

      locations.forEach((location) => {
        const markerPosition = new window.kakao.maps.LatLng(
          location.lat,
          location.lng
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
        bounds.extend(markerPosition);

        // 인포윈도우 설정
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="
              padding: 5px 5px;
              font-size: 12px;
              font-weight: bold;
              color: #333;
            ">
              ${location.name}
            </div>`,
          removable: true,
        });

        // 마커 클릭 시 인포윈도우 열기
        window.kakao.maps.event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });
      });

      map.setBounds(bounds);
    }
  }, [isSuccess, locations]);

  return <div id="map" className={styles.mapContainer} ref={container}></div>;
};

export default Map;
