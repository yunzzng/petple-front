import styles from "./postform.module.css";
import ChipInput from "@/components/UI/ChipInput";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import uploadIcon from "/images/icons/upload.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHeader from "./components/FormHeader";
import { PostFormData, PostFormFields } from "@/types/post.type";
import { postFormSchema } from "@/consts/zodSchema";

interface PostFormProps {
  post?: PostFormData;
  requestType: "create" | "update";
  isButtonDisabled?: boolean;
  onSubmit: (data: PostFormFields) => void;
  onClickDelete?: () => void;
}

const PostForm = ({
  requestType,
  post,
  isButtonDisabled,
  onSubmit,
  onClickDelete,
}: PostFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>(
    post?.images ?? []
  );
  const {
    control,
    register,
    watch,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PostFormFields>({
    defaultValues: {
      tags: post?.tags ?? [],
      images: post?.images ?? [],
      description: post?.description ?? "",
    },
    resolver: zodResolver(postFormSchema),
    mode: "onSubmit",
  });

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const currentImages = watch("images") || [];
    const totalImages: Array<File | string> = [...currentImages, ...files];
    if (totalImages.length > 10) {
      setError("images", { message: "최대 10장까지 등록할 수 있습니다." });
      return;
    }
    setValue("images", totalImages);
    const filterdFileImages = totalImages
      .filter((image) => image instanceof File)
      .map((file) => URL.createObjectURL(file));
    setPreviewImages(filterdFileImages);
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
    <>
      <FormHeader
        onClickSubmit={handleSubmit((data) => {
          if (!isDirty) return;
          onSubmit(data);
        })}
        onClickDelete={onClickDelete}
        reqeustType={requestType}
        isButtonDisabled={isButtonDisabled}
      />
      <form className={styles.form}>
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <>
              <ChipInput {...field} values={post?.tags} />
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
          onChange={handleChangeFileInput}
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
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className={styles.error}>{errors.description.message}</p>
        )}
      </form>
    </>
  );
};

export default PostForm;
