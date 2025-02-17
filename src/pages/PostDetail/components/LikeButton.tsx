import styles from "./likebutton.module.css";
import { useMutation } from "@tanstack/react-query";
import likeIcon from "/images/icons/like.svg";
import likeActiveIcon from "/images/icons/like_active.svg";
import { useMemo } from "react";
import { updateLikes } from "@/apis/like.api";
import { AxiosError } from "axios";

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
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const handleClickLike = () => {
    if (!postId) return;
    updateLikesMutate({ postId, likeStatus: !currentLikeStatus });
  };
  return (
    <div className={styles.like_button_wrraper}>
      <div onClick={handleClickLike} className={styles.like_button}>
        {currentLikeStatus ? (
          <img src={likeActiveIcon} alt="좋아요 활성화 버튼 이미지" />
        ) : (
          <img src={likeIcon} alt="좋아요 비활성화 버튼 이미지" />
        )}
        <span>{likes.length}명이 게시글을 좋아합니다.</span>
      </div>
    </div>
  );
};

export default LikeButton;
