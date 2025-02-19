import styles from "./popularposts.module.css";
import { getPopularPost } from "@/apis/post.api";
import { PostItem } from "@/types/post.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import clockIcon from "/images/icons/clock.svg";
import likeIcon from "/images/icons/like.svg";
import commentIcon from "/images/icons/comment.svg";
import { useNavigate } from "react-router-dom";

const convertRankToEmoji = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
};

const PopularPosts = () => {
  const navigate = useNavigate();
  const { data: posts } = useSuspenseQuery<PostItem[]>({
    queryKey: ["PopularPosts"],
    queryFn: getPopularPost,
  });
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        🏆 인기 게시글 <span>TOP10</span>
      </h1>
      <ul className={styles.post_list_wrapper}>
        {posts.map((post, key) => (
          <li
            key={`post-item-${post._id}`}
            className={styles.post_item}
            onClick={() => navigate(`/community/post/${post._id}`)}
          >
            <div className={styles.rank}>{convertRankToEmoji(key + 1)}</div>
            <div className={styles.post_item_img_container}>
              <img src={post.images[0]} alt="게시물 대표 이미지" />
            </div>
            <div className={styles.post_item_info}>
              <ul className={styles.tag_wrapper}>
                {post.tags.map((tag, index) => (
                  <li className={styles.tag} key={`tag-item-${index}`}>
                    #{tag}
                  </li>
                ))}
              </ul>
              <p className={styles.description}>{post.description}</p>
              <div className={styles.post_item_bottom}>
                <span className={styles.nickname}>{post.creator.nickName}</span>
                <span className={styles.createdAt}>
                  <img src={clockIcon} alt="시계 아이콘 이미지" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className={styles.comment_count}>
                  <img src={commentIcon} alt="댓글 아이콘 이미지" />
                  {post.comments.length}
                </span>
                <span className={styles.likes_count}>
                  <img src={likeIcon} alt="좋아요 아이콘 이미지" />
                  {post.likes.length}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularPosts;
