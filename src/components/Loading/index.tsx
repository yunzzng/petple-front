import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading_wrapper}>
      <img
        src="/images/loadingImage.svg"
        alt="로딩 이미지"
        className={styles.loading_image}
      />
      <div className={styles.dots_wrapper}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default Loading;
