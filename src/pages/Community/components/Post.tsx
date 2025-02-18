import { updateLikes } from "@/apis/like.api";
import styles from "./post.module.css";
import CommunityPost from "@/components/CommunityPost";
import LikeButton from "@/pages/PostDetail/components/LikeButton";
import { PostItem } from "@/types/post.type";
import userAuthStore from "@/zustand/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface PostProps {
  post: PostItem;
}

const Post = ({ post }: PostProps) => {
  const navigate = useNavigate();
  const { userId } = userAuthStore();
  const { pathname } = useLocation();
  const qc = useQueryClient();
  const currentLikeStatus = useMemo(
    () => !!userId && post.likes.includes(userId),
    [post.likes, userId]
  );

  const { mutate: updateLikesMutate } = useMutation({
    mutationFn: updateLikes,
    onMutate: ({ likeStatus, postId }) => {
      if (!userId) return;
      const prevPosts = qc.getQueryData(["posts"]);

      qc.setQueryData(["posts"], (prevPostsData: any) => {
        const newPosts = prevPostsData.pages.map(
          (page: { posts: PostItem[] }) => ({
            ...page,
            posts: page.posts.map((post: PostItem) => {
              if (post._id === postId) {
                const updatedLikes = likeStatus
                  ? [...post.likes, userId]
                  : post.likes.filter((id) => id !== userId);
                return { ...post, likes: updatedLikes };
              }
              return post;
            }),
          })
        );
        return {
          ...prevPostsData,
          pages: newPosts,
        };
      });

      return { prevPosts };
    },
    onError: (error: AxiosError, _variables, context) => {
      if (error.status === 401) {
        window.alert("로그인인 필요합니다.");
      }
      qc.setQueryData(["posts"], context?.prevPosts);
    },
  });

  const handleClickLike = () => {
    updateLikesMutate({ postId: post._id, likeStatus: !currentLikeStatus });
  };

  return (
    <>
      <li>
        <CommunityPost post={post} />
        <div
          className={styles.description}
          onClick={() =>
            pathname === "/community" && navigate(`/community/post/${post._id}`)
          }
        >
          {post.description}
        </div>
        <LikeButton
          likes={post.likes}
          currentLikeStatus={currentLikeStatus}
          handleClickLike={handleClickLike}
        />
      </li>
    </>
  );
};

export default Post;
