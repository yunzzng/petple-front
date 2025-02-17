import styles from "./communitypost.module.css";
import { Carousel } from "@/components";
import ClockIcon from "/images/icons/clock.svg";
import profileIcon from "/images/profile.png";
import commentIcon from "/images/icons/comment.svg";
import likeIcon from "/images/icons/like.svg";
import { PostItem } from "@/types/post.type";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: PostItem;
}

const CommunityPost = ({ post }: PostProps) => {
  const {
    creator,
    images,
    tags,
    description,
    createdAt,
    _id,
    comments,
    likes,
  } = post;
  const navigate = useNavigate();
  return (
    <>
      <li key={`post-item-${_id}`} className={styles.post}>
        <PostHeader
          creator={creator}
          tags={tags}
          createdAt={createdAt}
          commentsCount={comments.length}
          likesCount={likes.length}
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
        <div
          className={styles.description}
          onClick={() => navigate(`/community/post/${_id}`)}
        >
          {description}
        </div>
      </li>
    </>
  );
};

export default CommunityPost;

const PostHeader = (
  data: Pick<PostItem, "creator" | "createdAt" | "tags"> & {
    commentsCount: number;
    likesCount: number;
  }
) => {
  const { creator, tags, createdAt, commentsCount, likesCount } = data;
  return (
    <div className={styles.post_header}>
      <div className={styles.post_header_top}>
        <img
          src={creator.image || profileIcon}
          alt="유저 아바타 이미지"
          className={styles.creator_image}
        />
        <div className={styles.post_header_userinfo_right}>
          <p className={styles.username}>
            {creator.name}
            <span className={styles.nickname}>{creator.nickName}</span>
          </p>
          <div className={styles.icons_list}>
            <div className={styles.createdAt}>
              <img src={ClockIcon} alt="시계 이미지" />
              {new Date(createdAt).toLocaleDateString()}
            </div>
            <div className={styles.createdAt}>
              <img src={commentIcon} alt="댓글 이미지" />
              <span>{commentsCount}</span>
            </div>
            <div className={styles.createdAt}>
              <img src={likeIcon} alt="따봉 이미지" />
              <span>{likesCount}</span>
            </div>
          </div>
        </div>
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
