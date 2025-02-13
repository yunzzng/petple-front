import { useNavigate, useParams } from "react-router-dom";
import styles from "./postupdate.module.css";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { multipleImageUpload } from "@/utils/imageUpload";
import { addPost, getPostById } from "@/apis/post.api";
import PostForm, { PostFormFields } from "@/components/PostForm";
import { SubmitHandler } from "react-hook-form";

const PostUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () => id && getPostById(id),
  });

  const { mutateAsync: uploadImages } = useMutation({
    mutationFn: multipleImageUpload,
    onError: () => {
      // toast 추가 고려
    },
  });

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: addPost, //updatePost api만들기
    onSuccess: () => {
      navigate("/community");
    },
  });

  const handleSubmit: SubmitHandler<PostFormFields> = async ({
    tags,
    images,
    description,
  }) => {
    try {
      const uploadedImages = await uploadImages(images);
      await submitForm({ tags, images: uploadedImages, description });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <PostForm requestType="update" onSubmit={handleSubmit} post={post} />
    </div>
  );
};

export default PostUpdatePage;
