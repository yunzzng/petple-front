import styles from "./petfriends.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import useKakaoLoader from "@/components/Map/MapLoader";
import userAuthStore from "@/zustand/userAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getNearUsers } from "@/apis/profile.api";
import { useNavigate } from "react-router-dom";
import { UserType } from "@/types/user.type";

const PetFriendsPage = () => {
  const mapConatinerRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const navigate = useNavigate();
  const { isSuccess, cleanup } = useKakaoLoader();
  const signinedUser = userAuthStore();

  const { data: nearUsers } = useSuspenseQuery<UserType[]>({
    queryKey: ["locations", signinedUser.userId],
    queryFn: () =>
      getNearUsers({
        lng: signinedUser.userAddress?.location.coordinates[0] || 0,
        lat: signinedUser.userAddress?.location.coordinates[1] || 0,
      }),
    staleTime: 1000 * 60 * 60 * 5,
  });
  const filteredUsers = useMemo(
    () => nearUsers.filter((user) => user._id !== signinedUser.userId),
    [nearUsers]
  );

  const handleClickMarker = (user: UserType) => setSelectedUser(user);

  useEffect(() => {
    if (!isSuccess || typeof window === "undefined") return;

    const { kakao } = window;
    if (!kakao?.maps) return;
    initializeMap(kakao, filteredUsers, mapConatinerRef, handleClickMarker);
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
          <section
            className={styles.selected_user_card}
            onClick={() => navigate(`/chat/${selectedUser.nickName}`)}
          >
            <div className={styles.image_wrapper}>
              <img
                src={
                  selectedUser.userPet[0]?.image ?? selectedUser.profileImage
                }
                alt="펫 프로필 이미지"
                className={styles.profile_image}
              />
            </div>
            <div className={styles.user_info}>
              <h3 className={styles.user_name}>
                {selectedUser.userPet[0]?.name ?? selectedUser.nickName}
              </h3>
              {selectedUser.userPet[0] && (
                <p className={styles.pet_details}>
                  {selectedUser.userPet[0].breed} •{" "}
                  {selectedUser.userPet[0].age}살
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PetFriendsPage;

const initializeMap = (
  kakao: any,
  nearUsers: UserType[],
  mapConatinerRef: React.RefObject<HTMLDivElement | null>,
  handleClickMarker: (user: UserType) => void
) => {
  if (!mapConatinerRef.current) return;

  const defaultPosition = new kakao.maps.LatLng(36.35, 127.384);
  const zoomLevel = nearUsers.length > 0 ? 5 : 14;
  const options = { center: defaultPosition, level: zoomLevel };
  const map = new kakao.maps.Map(mapConatinerRef.current, options);

  const bounds = new kakao.maps.LatLngBounds();

  nearUsers.forEach((user: UserType) =>
    createMarker(kakao, map, user, bounds, handleClickMarker)
  );

  if (nearUsers.length > 0) map.setBounds(bounds);
};

const createMarker = (
  kakao: any,
  map: any,
  user: UserType,
  bounds: any,
  handleClickMarker: (user: UserType) => void
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
  user: UserType,
  handleClickMarker: (user: UserType) => void
) => {
  const wrapper = document.createElement("div");
  wrapper.className = "custom-marker";

  const img = document.createElement("img");
  img.src = user.userPet[0]?.image ?? user.profileImage;
  img.alt = "유저이미지";

  const label = document.createElement("div");
  label.className = "marker-label";
  label.innerText = user.userPet[0]?.name || user.name;

  wrapper.onclick = () => handleClickMarker(user);

  wrapper.appendChild(img);
  wrapper.appendChild(label);

  return wrapper;
};
