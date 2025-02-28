import styles from "./communitypost.module.css";
import { Carousel } from "@/components";
import { PostItem } from "@/types/post.type";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { deletePostById } from "@/apis/post.api";
import userAuthStore from "@/zustand/userAuth";

interface PostProps {
  post: PostItem;
}

const CommunityPost = ({ post }: PostProps) => {
  const { creator, images, tags, createdAt, _id, comments, likes } = post;

  return (
    <>
      <div key={`post-item-${_id}`} className={styles.post}>
        <PostHeader
          creator={creator}
          tags={tags}
          createdAt={createdAt}
          commentsCount={comments.length}
          likesCount={likes.length}
          postId={_id}
        />
        <Carousel>
          <Carousel.ItemList>
            {images.map((src, index) => (
              <Carousel.Item key={index} index={index}>
                <div className={styles.post_image_container}>
                  <img
                    src={src}
                    alt="게시글 이미지"
                    key={index}
                    className={styles.post_image}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel.ItemList>
          <Carousel.Indicator />
          <Carousel.Navigator />
        </Carousel>
      </div>
    </>
  );
};

export default CommunityPost;

const PostHeader = (
  data: Pick<PostItem, "creator" | "createdAt" | "tags"> & {
    commentsCount: number;
    likesCount: number;
    postId: string;
  }
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = userAuthStore();
  const { creator, tags, createdAt, commentsCount, likesCount, postId } = data;
  const isEditablePost = useMemo(
    () => location.pathname.includes("post") && creator._id === userId,
    [location]
  );
  const { mutate: deletePostMutate } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => {
      navigate("/community");
    },
  });
  return (
    <div className={styles.post_header}>
      <div className={styles.post_header_top}>
        <div className={styles.profileImage_wrapper}>
          <img
            src={creator.profileImage || "/images/profile.png"}
            alt="유저 아바타 이미지"
            className={styles.creator_image}
          />
        </div>
        <div className={styles.post_header_userinfo_right}>
          <p className={styles.username}>
            {creator.name}
            <span className={styles.nickname}>{creator.nickName}</span>
          </p>
          <div className={styles.icons_list}>
            <div className={styles.createdAt}>
              <img src={"/images/icons/clock.svg"} alt="시계 이미지" />
              {new Date(createdAt).toLocaleDateString()}
            </div>
            <div className={styles.createdAt}>
              <img src={"/images/icons/comment.svg"} alt="댓글 이미지" />
              <span>{commentsCount}</span>
            </div>
            <div className={styles.createdAt}>
              <img src={"/images/icons/like.svg"} alt="따봉 이미지" />
              <span>{likesCount}</span>
            </div>
          </div>
        </div>
        {isEditablePost && (
          <div className={styles.action_menu_wrapper}>
            <p onClick={() => navigate(`/community/update/${postId}`)}>수정</p>
            <p onClick={() => deletePostMutate(postId)}>삭제</p>
          </div>
        )}
      </div>
      <ul className={styles.tags_container}>
        {tags.map((tag, key) => (
          <li key={`tags-items-${key}`} className={styles.tag}>
            #{tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
