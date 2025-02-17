import styles from "./likebutton.module.css";
import { useMutation } from "@tanstack/react-query";
import likeIcon from "/images/icons/like.svg";
import likeActiveIcon from "/images/icons/like_active.svg";
import { useMemo } from "react";
import { updateLikes } from "@/apis/like.api";

interface LikeButtonProps {
  postId?: string;
  userId: string | null;
  likes: string[];
  inValidateQuery: () => void;
}

const LikeButton = ({
  postId,
  userId,
  likes,
  inValidateQuery,
}: LikeButtonProps) => {
  const currentLikeStatus = useMemo(
    () => !!userId && likes.includes(userId),
    [likes, userId]
  );
  const { mutate: updateLikesMutate } = useMutation({
    mutationFn: updateLikes,
    onSuccess: () => inValidateQuery(),
  });
  const handleClickLike = () => {
    if (!postId) return;
    updateLikesMutate({ postId, likeStatus: !currentLikeStatus });
  };
  return (
    <div onClick={handleClickLike} className={styles.wrraper}>
      {currentLikeStatus ? (
        <img src={likeActiveIcon} alt="좋아요 활성화 버튼 이미지" />
      ) : (
        <img src={likeIcon} alt="좋아요 비활성화 버튼 이미지" />
      )}
      <span>{likes.length}명이 게시글을 좋아합니다.</span>
    </div>
  );
};

export default LikeButton;
