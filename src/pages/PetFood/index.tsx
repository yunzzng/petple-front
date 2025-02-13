import Header from "@/components/Header";
import styles from "./food.module.css";
import petFoodBanner from "/images/foodBanner.png";

const PetFood = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src={petFoodBanner} alt="펫푸드 배너" className={styles.bannerImage} />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>반려동물 영양 가이드: 식재료 & 성분 분석</h2>
          <p className={styles.description}>
            반려동물도 건강한 식사가 중요합니다! <br />
            다양한 원재료의 영양 성분과 특성을 확인하고, 우리 아이에게 꼭 맞는 식단을 구성해보세요. <br />
            강아지와 고양이를 위한 올바른 식재료 선택이 어렵다면?<br />
            이곳에서 영양 정보와 추천 급여법을 한눈에 확인하세요!
          </p>
        </div>
      </div>
    </>
  );
};

export default PetFood;