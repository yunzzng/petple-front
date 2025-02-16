import { useMutation } from "@tanstack/react-query";
import likeIcon from "/images/icons/like.svg";
import { useMemo } from "react";
import { updateLikes } from "@/apis/like.api";

interface LikeButtonProps {
  postId?: string;
  userId: string | null;
  likes: string[];
}

const LikeButton = ({ postId, userId, likes }: LikeButtonProps) => {
  const currentLikeStatus = useMemo(
    () => !!userId && likes.includes(userId),
    [likes, userId]
  );
  const { mutate: updateLikesMutate } = useMutation({
    mutationFn: updateLikes,
  });
  const handleClickLike = () => {
    if (!postId) return;
    updateLikesMutate({ postId, likeStatus: !currentLikeStatus });
  };
  return (
    <button onClick={handleClickLike}>
      <img src={likeIcon} alt="좋아요 아이콘 이미지" />
      <p>좋아요 상태: {currentLikeStatus ? "O" : "X"} </p>
    </button>
  );
};

export default LikeButton;
