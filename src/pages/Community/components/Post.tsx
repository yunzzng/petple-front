import styles from "./post.module.css";
import { Carousel } from "@/components";
import ClockIcon from "/images/icons/clock.svg";
import profileIcon from "/images/profile.png";
import { PostItem } from "@/types/post.type";

interface PostProps {
  post: PostItem;
}

const Post = ({ post }: PostProps) => {
  const { creator, images, tags, description, createdAt, _id } = post;
  return (
    <>
      <li key={`post-item-${_id}`} className={styles.post}>
        <PostHeader creator={creator} tags={tags} createdAt={createdAt} />
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
        </Carousel>
        <div className={styles.description}>{description}</div>
      </li>
    </>
  );
};

export default Post;

const PostHeader = (data: Pick<PostItem, "creator" | "createdAt" | "tags">) => {
  const { creator, tags, createdAt } = data;
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
          <div className={styles.createdAt}>
            <img src={ClockIcon} alt="시계 이미지" />
            {new Date(createdAt).toLocaleDateString()}
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
