import { useNavigate, useParams } from "react-router-dom";
import styles from "./postupdate.module.css";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { multipleImageUpload } from "@/utils/imageUpload";
import { deletePostById, getPostById, updatePostById } from "@/apis/post.api";
import PostForm, { PostFormFields } from "@/components/PostForm";
import { SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

const PostUpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: () => id && getPostById(id),
  });

  const { mutateAsync: uploadImages } = useMutation({
    mutationFn: multipleImageUpload,
  });

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: updatePostById,
    onSuccess: () => navigate(`/community/detail/post/${id}`),
  });

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: deletePostById,
    onSuccess: () => navigate("/community"),
  });

  const handleUpdatePost: SubmitHandler<PostFormFields> = async ({
    tags,
    images,
    description,
  }) => {
    if (!id) return;
    const convertedImage = images.filter((image) => typeof image === "string");
    const filterdFile = images.filter((image) => image instanceof File);
    try {
      const uploadedImages = await uploadImages(filterdFile);
      const updatedImages = [...convertedImage, ...uploadedImages];
      await submitForm({ _id: id, tags, images: updatedImages, description });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = () => id && deletePost(id);

  useEffect(() => {
    if (post === null) return navigate("/404", { replace: true });
  }, [post]);

  return (
    <div className={styles.wrapper}>
      <PostForm
        requestType="update"
        onSubmit={handleUpdatePost}
        onClickDelete={handleDeletePost}
        post={post}
      />
    </div>
  );
};

export default PostUpdatePage;
