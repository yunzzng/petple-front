import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components";
import styles from "./petWalk.module.css";
import Map from "@/components/Map";
import { WalkData } from "@/types/petApi.type";
import { postWalkData } from "@/apis/public.api";
import userAuthStore from "@/zustand/userAuth";

const PetWalk = () => {
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const navigate = useNavigate();

  const { userId, userNickName, userImage, userPet } = userAuthStore();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const mutation = useMutation({
    mutationFn: postWalkData,
    onSuccess: () => {
      console.log("산책 기록이 성공적으로 저장되었습니다.");
    },
    onError: (error) => {
      console.error("산책 기록 저장 중 오류 발생:", error);
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "현재 위치",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const updateLocation = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude, name: "현재 위치" });
  };

  const startTracking = () => {
    if (!selectedPet) {
      alert("산책을 시작할 반려동물을 선택해주세요!");
      return;
    }

    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        updateLocation,
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 1000 }
      );
      setWatchId(id);
      setTracking(true);
    }
  };

  const stopTracking = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setTracking(false);

    const walkData: WalkData = {
      userId,
      petId: selectedPet ?? "",
      startTime: new Date().toISOString(),
      startLocation: `위도: ${userLocation?.lat}, 경도: ${userLocation?.lng}`,
      endTime: new Date().toISOString(),
      endLocation: `위도: ${userLocation?.lat}, 경도: ${userLocation?.lng}`,
    };

    mutation.mutate(walkData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>매일매일 산책 기록 🌱</h2>

      <div className={styles.userInfo}>
        {userImage && (
          <img
            src={userImage}
            alt="사용자 프로필"
            className={styles.profileImage}
          />
        )}
        <p className={styles.userName}>{userNickName} 님</p>
      </div>

      <div className={styles.petSelection}>
        <p>산책할 반려동물을 선택하세요:</p>
        <select
          value={selectedPet || ""}
          onChange={(e) => setSelectedPet(e.target.value)}
        >
          <option value="" disabled>
            반려동물 선택
          </option>
          {userPet?.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name}
            </option>
          ))}
        </select>
      </div>

      <p className={styles.description}>
        반려동물과 함께 산책을 다녀오셨나요?
        <br />
        이젠 산책을 다녀온 장소를 기록하여 추억으로 남겨보세요.
        <br />
        시작 버튼을 누르고 종료 버튼을 누르면 자동으로 지도에 마커가 찍히며
        거리를 계산해줍니다.
      </p>

      <div className={styles.description}>
        <span className={styles.description_span}>사용방법: </span>
        <ul className={styles.description_list}>
          <li>1️⃣ 현재 위치에서 시작 버튼을 눌러주세요.</li>
          <li>2️⃣ 반려동물과 함께 산책을 다니시면 돼요.</li>
          <li>
            <span className={styles.description_p_span}>
              🌱 종료되지 않게 주의해주세요.
            </span>
          </li>
          <li>3️⃣ 산책이 완료되면 종료 버튼을 눌러주세요.</li>
        </ul>
      </div>

      <div className={styles.tabContainer}>
        <Button label="시작" onClick={startTracking} disabled={tracking} />
        <Button
          label="종료"
          onClick={stopTracking}
          disabled={!tracking || mutation.isPending}
        />
        <Button
          label="기록보기"
          className={styles.listBtn}
          onClick={() => navigate("/petwalk/detail")}
        />
      </div>

      <div style={{ width: "360px" }}>
        <Map locations={userLocation ? [userLocation] : []} />
      </div>
    </div>
  );
};

export default PetWalk;
