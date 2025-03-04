import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Map from "@/components/Map";
import styles from "./placeDetail.module.css";
import categories from "@/consts/placeCategories";
import { Button } from "@/components";
// import defaultImg from "/images/titleLogo.png";
import { getPlaceDetail } from "@/apis/public.api";
import CategoryButtons from "@/components/PlaceCategoryButtons";
import { useEffect, useState } from "react";
import { PlaceInfo } from "@/types/petApi.type";
import { Helmet } from "react-helmet-async";

const PetPlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    location.state?.category || categories[0].id
  );
  const [placeData, setPlaceData] = useState(location.state ?? {});

  const { data, isError } = useQuery({
    queryKey: ["placeDetail", id],
    queryFn: () => getPlaceDetail(id!),
    enabled: !!id,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data?.place) {
      setPlaceData((prev: PlaceInfo) => ({
        ...prev,
        ...data.place,
        lat: data.place.lat ?? prev.lat,
        lng: data.place.lng ?? prev.lng,
      }));
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{`펫 플레이스: ${placeData.title ?? "장소"} | PetPle`}</title>
        <meta
          name="description"
          content={`${
            placeData.title ?? "장소"
          }의 상세 정보를 확인할 수 있습니다.`}
        />
      </Helmet>
      <h2 className={styles.title}>전국 반려동물 동반 장소 찾기</h2>

      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          // 선택한 카테고리를 세션스토리지에 저장
          sessionStorage.setItem("selectedCategory", id);
          navigate(`/petplace?category=${id}`);
        }}
      />

      <Button onClick={() => navigate(-1)} className={styles.backButton}>
        ◀ 목록으로 돌아가기
      </Button>

      <div className={styles.placeList}>
        {isError ? (
          <p className={styles.messageText}>
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        ) : !data ? (
          <p className={styles.messageText}>장소 정보를 찾을 수 없습니다.</p>
        ) : (
          <>
            <div className={styles.mapContainer}>
              {placeData.lat != null && placeData.lng != null ? (
                <Map
                  locations={[
                    {
                      lat: placeData.lat,
                      lng: placeData.lng,
                      name: placeData.title ?? "정보 없음",
                    },
                  ]}
                />
              ) : (
                <p className={styles.noMapText}>좌표 정보가 없습니다.</p>
              )}
            </div>

            <div className={styles.placeItem}>
              <img
                src={placeData.imageUrl || "/images/titleLogo.png"}
                alt={placeData.name ?? "정보 없음"}
                className={styles.placeImage}
              />
              {placeData.subImageUrl && (
                <img
                  src={placeData.subImageUrl}
                  alt={`${placeData.name} 추가 이미지`}
                  className={styles.subImage}
                />
              )}
              <div className={styles.testBox}>
                <h3 className={styles.placeName}>
                  {placeData.title ?? "정보 없음"}
                </h3>
                <p className={styles.infoText}>
                  <strong className={styles.dataName}>주소:</strong>
                  {placeData.address ?? "정보 없음"}
                </p>
                <p className={styles.infoText}>
                  <strong className={styles.dataName}>전화번호:</strong>
                  {placeData.tel ?? ""}
                </p>
                {placeData.homepage && (
                  <p>
                    <strong className={styles.dataName}>홈페이지:</strong>
                    <a
                      href={placeData.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {placeData.homepage}
                    </a>
                  </p>
                )}

                <div className={styles.infoBox}>
                  <h4 className={styles.infoTitle}>반려동물 관련 정보</h4>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>동반 필요 사항:</strong>
                    {data.place.additionalInfo.acmpyNeedMtr ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>사고 대비 사항:</strong>
                    {data.place.additionalInfo.relaAcdntRiskMtr ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>동반 유형 코드:</strong>
                    {data.place.additionalInfo.acmpyTypeCd ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>관련 구비 시설:</strong>
                    {data.place.additionalInfo.relaPosesFclty ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>비치 품목:</strong>
                    {data.place.additionalInfo.relaFrnshPrdlst ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>기타 동반 정보:</strong>
                    {data.place.additionalInfo.etcAcmpyInfo ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>구매 품목:</strong>
                    {data.place.additionalInfo.relaPurcPrdlst ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>동반 가능 동물:</strong>
                    {data.place.additionalInfo.acmpyPsblCpm ?? "정보 없음"}
                  </p>
                  <p className={styles.infoText}>
                    <strong className={styles.dataName}>렌탈 품목:</strong>
                    {data.place.additionalInfo.relaRntlPrdlst ?? "정보 없음"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetPlaceDetail;
