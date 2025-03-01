import { SubmitHandler } from "react-hook-form";
import styles from "./postcreate.module.css";
import { PostForm } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { multipleImageUpload } from "@/utils/imageUpload";
import { addPost } from "@/apis/post.api";
import { useNavigate } from "react-router-dom";
import { PostFormFields } from "@/types/post.type";
import { AxiosError } from "axios";
import useToast from "@/components/UI/Toast/hooks/useToast";
import { useMemo } from "react";

const PostCreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: uploadImages, isPending: isimageUploadPending } =
    useMutation({
      mutationFn: multipleImageUpload,
      onError: (error: AxiosError) => {
        if (error.code === "ERR_NETWORK") {
          toast({
            type: "ERROR",
            description:
              "이미지 업로드에 실패하였습니다.😥 용량이 큰 이미지는 올라 가지 않을 수 있어요.",
          });
        }
      },
    });
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: addPost,
      onSuccess: () => {
        navigate("/community");
        toast({
          type: "SUCCESS",
          description: "게시물 작성에 성공하였습니다.😀",
        });
      },
      onError: () => {
        toast({
          type: "ERROR",
          description: "게시물 작성에 실패하였습니다.😥",
        });
      },
    });

  const handleSubmit: SubmitHandler<PostFormFields> = async ({
    tags,
    images,
    description,
  }) => {
    const uploadedImages = await uploadImages(images as File[]);
    await submitForm({ tags, images: uploadedImages, description });
  };

  const isButtonDisabled = useMemo(() => {
    return isimageUploadPending || isFormSubmitPending;
  }, [isimageUploadPending, isFormSubmitPending]);

  return (
    <div className={styles.wrapper}>
      <PostForm
        requestType="create"
        onSubmit={handleSubmit}
        isButtonDisabled={isButtonDisabled}
      />
    </div>
  );
};

export default PostCreatePage;
