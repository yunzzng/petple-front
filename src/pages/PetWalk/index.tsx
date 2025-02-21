import styles from "./petWalk.module.css";

const PetWalk = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>매일매일 산책 기록 🌱</h2>
      <p className={styles.description}>
        반려동물과 함께 산책을 다녀오셨나요?
        <br />
        이젠 산책을 다녀온 장소를 기록하여 추억으로 남겨보세요.
        <br />
        시작 버튼을 누르고 종료 버튼을 누르면 자동으로 지도에 마커가 찍히며
        거리를 계산해줍니다.
      </p>
    </div>
  );
};

export default PetWalk;
