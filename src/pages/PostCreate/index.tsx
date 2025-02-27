import { SubmitHandler } from "react-hook-form";
import styles from "./postcreate.module.css";
import { PostForm } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { multipleImageUpload } from "@/utils/imageUpload";
import { addPost } from "@/apis/post.api";
import { useNavigate } from "react-router-dom";
import { PostFormFields } from "@/types/post.type";

const PostCreatePage = () => {
  const navigate = useNavigate();

  const { mutateAsync: uploadImages } = useMutation({
    mutationFn: multipleImageUpload,
    onError: () => {
      // toast 추가 고려
    },
  });

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: addPost,
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
      const uploadedImages = await uploadImages(images as File[]);
      await submitForm({ tags, images: uploadedImages, description });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <PostForm requestType="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default PostCreatePage;