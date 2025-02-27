import styles from "./likebutton.module.css";
// import likeIcon from "/images/icons/like.svg";
// import likeActiveIcon from "/images/icons/like_active.svg";

interface LikeButtonProps {
  likes: string[];
  currentLikeStatus: boolean;
  handleClickLike: () => void;
}

const LikeButton = ({
  likes,
  currentLikeStatus,
  handleClickLike,
}: LikeButtonProps) => {
  return (
    <div className={styles.like_button_wrraper}>
      <div onClick={handleClickLike} className={styles.like_button}>
        {currentLikeStatus ? (
          <img src={"/images/icons/like_active.svg"} alt="좋아요 활성화 버튼 이미지" />
        ) : (
          <img src={"/images/icons/like.svg"} alt="좋아요 비활성화 버튼 이미지" />
        )}
        <span>{likes.length}명이 게시글을 좋아합니다.</span>
      </div>
    </div>
  );
};

export default LikeButton;
