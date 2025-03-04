import styles from "./likebutton.module.css";
import LikeActiveIcon from "@/assets/icons/like_active.svg?react";
import LikeIcon from "@/assets/icons/like.svg?react";
import useDebounce from "@/hooks/useDebounce";

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
  const debouncedHandleClickLike = useDebounce(handleClickLike);

  return (
    <div className={styles.like_button_wrraper}>
      <div onClick={debouncedHandleClickLike} className={styles.like_button}>
        {currentLikeStatus ? <LikeActiveIcon /> : <LikeIcon />}
        <span>{likes.length}명이 게시글을 좋아합니다.</span>
      </div>
    </div>
  );
};

export default LikeButton;
