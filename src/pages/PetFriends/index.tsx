import styles from "./petfriends.module.css";
import { useEffect, useRef, useState } from "react";
import useKakaoLoader from "@/components/Map/MapLoader";
import userAuthStore from "@/zustand/userAuth";
import { useQuery } from "@tanstack/react-query";
import { getNearUsers } from "@/apis/profile.api";

const PetFriendsPage = () => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const { isSuccess, cleanup } = useKakaoLoader();
  const user: any = userAuthStore();
  const mapConatinerRef = useRef<HTMLDivElement>(null);
  const { data: nearUsers } = useQuery({
    queryKey: ["locations", user.address.jibunCode],
    queryFn: () =>
      getNearUsers({
        lng: user.address.location.coordinates[0],
        lat: user.address.location.coordinates[1],
      }),
    enabled: !!user,
  });

  const handleClickMarker = (user: any) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (!isSuccess || typeof window === "undefined") return;

    const { kakao } = window;
    if (!kakao?.maps) return;

    initializeMap(kakao, nearUsers, mapConatinerRef, handleClickMarker);

    return () => cleanup();
  }, [isSuccess, nearUsers]);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          id="map"
          className={styles.map_container}
          ref={mapConatinerRef}
        ></div>
        {selectedUser && (
          <section>
            <div className={styles.selected_user_image_wrapper}>
              <img
                src={
                  selectedUser.userPet[0]?.image ?? selectedUser.profileImage
                }
                alt="펫 프로필 이미지"
              />
            </div>
            <p>{selectedUser?.userPet[0]?.name ?? selectedUser.nickName}</p>
          </section>
        )}
      </div>
    </>
  );
};

export default PetFriendsPage;

const initializeMap = (
  kakao: any,
  nearUsers: any,
  mapConatinerRef: any,
  handleClickMarker: (user: any) => void
) => {
  if (!mapConatinerRef.current) return;

  const defaultPosition = new kakao.maps.LatLng(36.35, 127.384);
  const zoomLevel = nearUsers.length > 0 ? 5 : 14;
  const options = { center: defaultPosition, level: zoomLevel };
  const map = new kakao.maps.Map(mapConatinerRef.current, options);

  const bounds = new kakao.maps.LatLngBounds();

  nearUsers.forEach((user: any) =>
    createMarker(kakao, map, user, bounds, handleClickMarker)
  );

  if (nearUsers.length > 0) map.setBounds(bounds);
};

const createMarker = (
  kakao: any,
  map: any,
  user: any,
  bounds: any,
  handleClickMarker: (user: any) => void
) => {
  const position = new kakao.maps.LatLng(
    user.address.location.coordinates[1],
    user.address.location.coordinates[0]
  );
  const content = createCustomOverlayMarker(user, handleClickMarker);
  const customOverlay = new kakao.maps.CustomOverlay({
    position,
    content,
    yAnchor: 1,
  });

  customOverlay.setMap(map);
  bounds.extend(position);
};

const createCustomOverlayMarker = (
  user: any,
  handleClickMarker: (user: any) => void
) => {
  const wrapper = document.createElement("div");
  wrapper.className = "custom-marker";

  const img = document.createElement("img");
  img.src = user.userPet[0]?.image ?? user.profileImage;
  img.alt = "유저이미지";

  const label = document.createElement("div");
  label.className = "marker-label";
  label.innerText = user.userPet[0]?.name || user.name;

  wrapper.onclick = () => {
    handleClickMarker(user);
  };

  wrapper.appendChild(img);
  wrapper.appendChild(label);

  return wrapper;
};
