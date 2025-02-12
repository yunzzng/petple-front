import styles from "./postcreate.module.css";
import ChipInput from "@/components/ChipInput";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import uploadIcon from "/images/icons/upload.svg";
import { Button } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addPost } from "@/apis/post.api";
import { multipleImageUpload } from "@/utils/imageUpload";
import { useNavigate } from "react-router-dom";

const PostFormSchema = z.object({
  tags: z
    .array(z.string())
    .min(1, "최소 1개 이상의 태그를 입력하세요.")
    .max(10, "최대 10개의 태그만 추가할 수 있습니다."),
  images: z.array(z.instanceof(File)),
  description: z.string().trim().min(1, "내용을 입력해주세요."),
});

type PostFormFields = z.infer<typeof PostFormSchema>;

const PostCreatePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const {
    register,
    watch,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PostFormFields>({
    defaultValues: {
      tags: [],
      images: [],
      description: "",
    },
    resolver: zodResolver(PostFormSchema),
    mode: "onSubmit",
  });

  const { mutateAsync: uploadImages } = useMutation({
    mutationFn: multipleImageUpload,
    onError: () => {},
  });

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      navigate("/community");
    },
  });

  const onSubmit: SubmitHandler<PostFormFields> = async ({
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

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const currentImages = watch("images") || [];
    const totalImages = [...currentImages, ...files];
    if (totalImages.length > 10) {
      setError("images", { message: "최대 10장까지 등록할 수 있습니다." });
      return;
    }

    setValue("images", totalImages);
    const previewImages = totalImages.map((file) => URL.createObjectURL(file));

    setPreviewImages(previewImages);
  };

  const handleClickDeleteImage = (index: number) => {
    const currentImages = watch("images") || [];
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setValue("images", updatedImages);
  };

  const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <header className={styles.form_header}>
          <button className={styles.cancel_button}>취소</button>
          <Button
            type="submit"
            label="등록 하기"
            onClick={handleSubmit(onSubmit)}
            className={styles.post_button}
          />
        </header>
        <form className={styles.form}>
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <ChipInput {...field} />
                {errors.tags && (
                  <p className={styles.error}>{errors.tags.message}</p>
                )}
              </>
            )}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("images", {
              validate: (files) =>
                files.length <= 10 ? true : "최대 10장까지 등록할 수 있습니다.",
            })}
            ref={(e) => {
              register("images").ref(e);
              fileInputRef.current = e;
            }}
            onChange={handleChangeInput}
            className={styles.hiddenFileInput}
          />
          <ul className={styles.fileUpload_container}>
            <li
              className={styles.uploaded_file}
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={uploadIcon}
                alt="업로드 버튼"
                className={styles.default_image}
              />
            </li>
            {previewImages.map((image, index) => (
              <li
                className={styles.uploaded_file}
                key={`preview-image-${index}`}
                onClick={() => handleClickDeleteImage(index)}
              >
                <img
                  src={image}
                  alt="업로드 버튼"
                  className={styles.previewImage}
                />
              </li>
            ))}
          </ul>
          <p className={styles.info}>* 최대 10장까지 등록 가능합니다.</p>
          {errors.images && (
            <p className={styles.error}>{errors.images.message}</p>
          )}
          <textarea
            id="description"
            maxLength={5000}
            placeholder="내용을 입력해주세요"
            className={styles.description}
            onInput={handleResizeHeight}
            rows={1}
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;
