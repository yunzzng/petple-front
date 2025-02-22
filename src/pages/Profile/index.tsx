import profileImg from "/images/profile.png";
import { useForm } from "react-hook-form";
import userAuthStore from "@/zustand/userAuth";
import { Button, Tabs } from "@/components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./profile.module.css";
import { imageUpload } from "@/utils/imageUpload";
import plus from "/images/plus.png";
import { useNavigate } from "react-router-dom";
import PetForm from "@/components/PetForm";
import pencil from "/images/pencil.png";
import prev from "/images/prev.png";
import commentIcon from "/images/icons/comment.svg";
import like from "/images/icons/like.svg";
import { checkNickName, getMyPosts, updateUserInfo } from "@/apis/profile.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/consts/zodSchema";
import { PostItem } from "@/types/post.type";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";

const Profile = () => {
  const { userNickName, userImage, userEmail, userPet } = userAuthStore();
  console.log("userImage", userImage);
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      nickName: userNickName || "",
    },
    resolver: zodResolver(userSchema),
  });
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(profileImg);
  const [file, setFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isNickNameConfirm, setIsNickNameConfirm] = useState<boolean>(false);
  const [confirmedNickName, setConfirmedNickName] = useState<string | null>(
    userNickName || ""
  );
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [likePosts, setLikePosts] = useState<PostItem[]>([]);
  const {
    page,
    setPage,
    paginatedData: paginatedPosts,
    totalPages,
  } = usePagination(posts);
  const {
    page: likePage,
    setPage: setLikePage,
    paginatedData: paginatedLikePosts,
    totalPages: likeTotalPages,
  } = usePagination(likePosts);

  useEffect(() => {
    if (userImage) {
      setPreviewImg(userImage);
    }

    getPosts();
  }, []);

  const handleClickFile = () => {
    fileInputRef?.current?.click();
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImg(previewUrl);
    }
  };

  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("nickName", e.target.value);
    setIsNickNameConfirm(false);
  };

  // 회원정보 수정
  const onSubmitUser = async () => {
    const nickName = getValues("nickName");
    let imageUrl = userImage;

    if (nickName === userNickName) {
      setIsNickNameConfirm(true);
      setConfirmedNickName(nickName);
    }

    if (!isNickNameConfirm || nickName !== confirmedNickName) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (file) {
      console.log("file", file);
      imageUrl = await imageUpload(file);
      console.log("userImage", userImage);
      userAuthStore.setState({ userImage: imageUrl });
    }

    // 수정 전 닉네임, 이미지 같으면 api요청 x
    if (nickName === userNickName && imageUrl === userImage) {
      setUpdating(false);
      alert("회원정보 수정 완료");
      return;
    }

    const success = await updateUserInfo(userEmail, nickName, imageUrl!);
    console.log("성공imageUrl", imageUrl);
    if (success) {
      userAuthStore.setState({ userNickName: nickName, userImage: imageUrl });
      alert("회원정보 수정 완료");
      setUpdating(false);
    } else {
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  // 닉네임 중복 확인
  const nickNameConfirm = async () => {
    const nickName = getValues("nickName");

    if (nickName === userNickName) {
      setIsNickNameConfirm(true);
      setConfirmedNickName(nickName);
    }

    if (!nickName) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    console.log(nickName.length);
    if (nickName.length > 10) {
      alert("닉네임은 10글자 이하로 입력해주세요.");
      return;
    }

    if (nickName === userNickName) {
      setIsNickNameConfirm(true);
      alert("사용가능한 닉네임 입니다.");
      return;
    }

    const isAvailable = await checkNickName(nickName);
    if (isAvailable) {
      setIsNickNameConfirm(true);
      setConfirmedNickName(nickName);
      alert("사용가능한 닉네임 입니다.");
    } else {
      setIsNickNameConfirm(false);
      setConfirmedNickName(null);
      alert("이미 사용 중인 닉네임입니다.");
    }
  };

  // petForm 추가
  const handleAddPetProfile = () => {
    navigate("/createpet");
  };

  //게시물 가져오기
  const getPosts = async () => {
    try {
      const response = await getMyPosts();
      if (response) {
        const likePosts = response.likePosts || [];
        const myPosts = response.posts || [];
        setPosts(myPosts);
        setLikePosts(likePosts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevProfile = () => {
    setUpdating(false);
    setPreviewImg(userImage || "");
    reset({
      nickName: userNickName || "",
    });
  };

  return (
    <div className={style.profile_total_wrap}>
      <form onSubmit={handleSubmit(onSubmitUser)} className={style.form}>
        {updating ? (
          <ul className={style.userUl}>
            <img
              onClick={handlePrevProfile}
              src={prev}
              className={style.prev}
            />
            <li className={style.img_wrap}>
              <img
                onClick={handleClickFile}
                src={previewImg}
                className={style.img}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChangeImg}
                className={style.file}
              />
            </li>
            <li className={style.nickname_wrap}>
              <div className={style.nickName_div}>
                <input
                  className={style.input}
                  value={watch("nickName")}
                  placeholder="닉네임은 1글자 이상, 10글자 이하"
                  onChange={handleChangeNickName}
                />
                <Button
                  type="button"
                  onClick={nickNameConfirm}
                  className={style.button}
                >
                  중복확인
                </Button>
              </div>
            </li>
            <Button type="submit" className={style.button}>
              회원정보 수정
            </Button>
          </ul>
        ) : (
          <ul className={style.userUl}>
            <div className={style.userUl_div}>
              <img src={userImage || ""} className={style.basic_img} />
              <div className={style.userName_box}>
                <p>{userNickName}</p>
                <img
                  onClick={() => setUpdating(true)}
                  src={pencil}
                  className={style.pencil}
                />
              </div>
            </div>
          </ul>
        )}
      </form>
      <div className={style.pet_wrap}>
        <div className={style.pet_div}>
          <div>
            <p>나의 반려동물 🐾</p>
          </div>
          <img
            src={plus}
            className={style.plus}
            onClick={handleAddPetProfile}
          />
        </div>
        {userPet?.map((pet, index) => (
          <div key={index}>
            <PetForm
              _id={pet._id}
              name={pet.name}
              age={pet.age}
              image={pet.image}
              breed={pet.breed}
            />
          </div>
        ))}
      </div>
      <Tabs.Root className={style.tabs_root}>
        <Tabs.MenuList className={style.tabs_menulist}>
          <Tabs.Menu index={1}>
            <Button className={style.tabs_button}>작성한 게시글</Button>
          </Tabs.Menu>
          <Tabs.Menu index={2}>
            <Button className={style.tabs_button}>좋아요 게시글</Button>
          </Tabs.Menu>
        </Tabs.MenuList>
        <Tabs.MenuList>
          {/* <div className={style.pennel_div}> */}
          <Tabs.Pannel index={1} className={style.pennel_div}>
            {paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <div
                  key={post._id}
                  className={style.pennel_img_div}
                  onClick={() => navigate(`/community/post/${post._id}`)}
                >
                  <img src={post.images[0]} className={style.tabs_img} />
                  <div className={style.info}>
                    <div className={style.comment}>
                      <img src={commentIcon} />
                      {post.comments.length}
                    </div>
                    <div className={style.likes}>
                      <img src={like} />
                      {post.likes.length}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>작성한 게시글이 없습니다.</p>
            )}
            <Pagination
              page={page}
              totalPages={totalPages}
              startPage={1}
              endPage={totalPages}
              setPage={setPage}
            />
          </Tabs.Pannel>

          <Tabs.Pannel index={2} className={style.pennel_div}>
            {paginatedLikePosts.length > 0 ? (
              paginatedLikePosts.map((post) => (
                <div
                  key={post._id}
                  className={style.pennel_img_div}
                  onClick={() => navigate(`/community/post/${post._id}`)}
                >
                  <img src={post.images[0]} className={style.tabs_img} />
                  <div className={style.info}>
                    <div className={style.comment}>
                      <img src={commentIcon} />
                      {post.comments.length}
                    </div>
                    <div className={style.likes}>
                      <img src={like} />
                      {post.likes.length}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}

            <Pagination
              page={likePage}
              totalPages={likeTotalPages}
              startPage={1}
              endPage={likeTotalPages}
              setPage={setLikePage}
            />
          </Tabs.Pannel>
        </Tabs.MenuList>
      </Tabs.Root>
    </div>
  );
};

export default Profile;
