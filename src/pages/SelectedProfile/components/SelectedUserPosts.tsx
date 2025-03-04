import { Tabs } from "@/components";
import style from "../selectedProfile.module.css";
import Pagination from "@/components/UI/Pagination";
import { FC, useEffect, useState } from "react";
import { PostItem } from "@/types/post.type";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "@/apis/post.api";

interface SelectedUserPostsProp {
  userNickName: string;
}

const SelectedUserPosts: FC<SelectedUserPostsProp> = ({ userNickName }) => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    userPosts();
  }, [currentPage]);

  const userPosts = async () => {
    try {
      const response = await getUserPosts(userNickName, currentPage);

      if (response) {
        setPosts(response.userPosts.posts || []);
        setTotalPage(response.userPosts.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tabs.Root className={style.tabs_root}>
      <Tabs.MenuList className={style.tabs_menulist}>
        <Tabs.Menu index={1}>
          <p>{userNickName}님의 작성 게시글</p>
        </Tabs.Menu>
      </Tabs.MenuList>
      <Tabs.MenuList>
        <Tabs.Pannel index={1} className={style.pennel_div}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className={style.pennel_img_div}
                onClick={() => navigate(`/community/post/${post._id}`)}
              >
                <img
                  src={post.images[0]}
                  className={style.tabs_img}
                  alt="내 게시물 이미지"
                />
                <div className={style.info}>
                  <div className={style.comment}>
                    <img src={"/images/comment_white.png"} alt="게시물 댓글" />
                    {post.comments.length}
                  </div>
                  <div className={style.likes}>
                    <img src={"/images/like_white.png"} alt="게시물 좋아요" />
                    {post.likes.length}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>작성한 게시글이 없습니다.</p>
          )}
          {posts.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPage}
              startPage={1}
              endPage={totalPage}
              setPage={setCurrentPage}
              className={style.pagination}
            >
              <Pagination.Navigator type="prev" />
              <Pagination.PageButtons />
              <Pagination.Navigator type="next" />
            </Pagination>
          )}
        </Tabs.Pannel>
      </Tabs.MenuList>
    </Tabs.Root>
  );
};

export default SelectedUserPosts;
