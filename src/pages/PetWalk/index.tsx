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
        거리를 자동으로 계산해줍니다. 
      </p>
      <p className={styles.description}>
        <span className={styles.description_span}>사용방법: </span>
        <p className={styles.description_p}>
          1️⃣ 현재 위치에서 시작 버튼을 눌러주세요.
        </p>
        <p className={styles.description_p}>
          2️⃣ 반려동물과 함께 산책을 다니시면 돼요.
        </p>
        <span className={styles.description_p_span}>
          🌱 종료되지 않게 주의해주세요.
        </span>
        <p className={styles.description_p}>
          3️⃣ 산책이 완료되면 종료버튼을 눌러주세요.
        </p>
        <br />
        <span className={styles.description_span}>안내사항: </span>
        <p className={styles.description_p}>
          정확한 거리를 측정하기 위해서는 wifi가 연결된 기기에서 사용해주세요.
        </p>
      </p>
    </div>
  );
};

export default PetWalk;
