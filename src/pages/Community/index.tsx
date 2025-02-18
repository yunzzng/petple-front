import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "./community.module.css";
import { useEffect, useRef } from "react";
import { getPosts } from "@/apis/post.api";
import { PostItem } from "@/types/post.type";
import Post from "./components/Post";
import FloatingButton from "./components/FloatingButton";

const CommunityPage = () => {
  const postContainerRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { data: posts, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    select: (data) => {
      const posts = data.pages.map((page) => page.posts);
      const flattedPosts = posts.flat();
      return flattedPosts;
    },
    initialPageParam: 1,
    getNextPageParam: ({ pageInfo }) => pageInfo.nextPage,
  });

  const observerCallback: IntersectionObserverCallback = (entries) => {
    const { isIntersecting } = entries[0];
    if (isIntersecting) {
      fetchNextPage();
    }
  };

  const observer = new IntersectionObserver(observerCallback);
  useEffect(() => {
    if (!targetRef.current) return;
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.wrapper}>
      <ul className={styles.post_container} ref={postContainerRef}>
        {posts?.map((post: PostItem) => (
          <Post post={post} key={`community-post-${post._id}`} />
        ))}
        <div ref={targetRef}></div>
      </ul>
      <FloatingButton />
    </section>
  );
};

export default CommunityPage;
