import styles from "./postdetail.module.css";
import { getPostById } from "@/apis/post.api";
import CommunityPost from "@/components/CommunityPost";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comment from "./components/Comment";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addComment,
  addReply,
  deleteComment,
  deleteReply,
  updateComment,
  updateReply,
} from "@/apis/comment.api";
import { useMemo, useState } from "react";
import { CommentType, ReplyType } from "@/types/post.type";
import userAuthStore from "@/zustand/userAuth";
import LikeButton from "./components/LikeButton";
import Header from "@/components/Header";
import { AxiosError } from "axios";
import { updateLikes } from "@/apis/like.api";
import { useToast } from "@/components/Toast/components";

const CommentSchema = z.object({
  description: z.string().trim().min(1, "내용을 입력해주세요."),
});

type CommentFormFields = z.infer<typeof CommentSchema>;
type SubmitType =
  | "ADD_COMMENT"
  | "UPDATE_COMMENT"
  | "ADD_REPLY"
  | "UPDATE_REPLY";
const PostDetailPage = () => {
  const [targetComment, setTargetComment] = useState<CommentType | null>(null);
  const [targetReply, setTargetReply] = useState<ReplyType | null>(null);
  const [submitType, setSubmitType] = useState<SubmitType>("ADD_COMMENT");
  const qc = useQueryClient();
  const user = userAuthStore();
  const { id: postId } = useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["Post", postId],
    queryFn: () => postId && getPostById(postId),
  });
  const currentLikeStatus = useMemo(
    () => !!user.userId && post.likes.includes(user.userId),
    [post.likes, user.userId]
  );

  const inValidateQuery = () =>
    qc.invalidateQueries({ queryKey: ["Post", postId] });

  const { register, handleSubmit, setValue, resetField } =
    useForm<CommentFormFields>({
      defaultValues: {
        description: "",
      },
      resolver: zodResolver(CommentSchema),
      mode: "onSubmit",
    });

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { mutate: addReplyMutate } = useMutation({
    mutationFn: addReply,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { mutate: updateReplyMutate } = useMutation({
    mutationFn: updateReply,
    onSuccess: () => inValidateQuery(),
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });

  const onSubmit = ({ description }: CommentFormFields) => {
    if (!postId) return;
    if (!user) {
      window.alert("로그인이 필요합니다.");
      return;
    }
    if (submitType === "ADD_COMMENT") {
      addCommentMutate({ description, postId, hasParent: false });
    }
    if (submitType === "UPDATE_COMMENT" && targetComment?._id) {
      updateCommentMutate({ _id: targetComment?._id, description, postId });
    }
    if (submitType === "ADD_REPLY" && targetComment) {
      addReplyMutate({
        targetCommentId: targetComment._id,
        description,
        tag: targetComment.creator._id,
      });
    }
    if (
      submitType === "UPDATE_REPLY" &&
      targetReply?._id &&
      targetComment?._id
    ) {
      updateReplyMutate({
        description,
        commentId: targetComment?._id,
        replyId: targetReply?._id,
      });
    }
    setTargetComment(null);
    setTargetReply(null);
    setSubmitType("ADD_COMMENT");
    resetField("description");
  };

  const handleDeleteReply = (commentId: string, replyId: string) =>
    deleteReplyMutate({ commentId, replyId });

  const handleUpdateReply = (targetReply: ReplyType) => {
    setSubmitType("UPDATE_REPLY");
    setTargetReply(targetReply);
    setValue("description", targetReply.description);
  };

  const handleUpdateComment = (targetComment: CommentType) => {
    setSubmitType("UPDATE_COMMENT");
    setTargetComment(targetComment);
    setValue("description", targetComment?.description);
  };

  const handleDeleteComment = (commentId: string) =>
    postId && deleteCommentMutate({ postId, commentId });

  const handleReply = (targetComment: CommentType) => {
    setSubmitType("ADD_REPLY");
    setTargetComment(targetComment);
  };

  const { mutate: updateLikesMutate } = useMutation({
    mutationFn: updateLikes,
    onSuccess: () => {
      inValidateQuery();
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) window.alert("로그인인 필요합니다.");
    },
  });
  const { toast } = useToast();
  const handleClickLike = () => {
    if (!postId) return;
    if (!user.userId) {
      toast({
        type: "INFO",
        description: "로그인이 필요합니다.",
      });
      return;
    }
    updateLikesMutate({ postId, likeStatus: !currentLikeStatus });
  };

  return (
    <div className={styles.wrraper}>
      <Header />
      <CommunityPost post={post} />
      <div className={styles.description}>{post.description}</div>
      <LikeButton
        likes={post.likes}
        currentLikeStatus={currentLikeStatus}
        handleClickLike={handleClickLike}
      />
      <Comment
        comments={post.comments}
        signinedUserId={user.userId}
        handleReply={handleReply}
        handleDeleteReply={handleDeleteReply}
        handleUpdateReply={handleUpdateReply}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
      />
      <form className={styles.comment_submit_form}>
        {targetComment && (
          <p className={styles.target_comment}>
            @{targetComment.creator.nickName}
          </p>
        )}
        <div className={styles.comment_input}>
          <input
            type="text"
            {...register("description")}
            placeholder="댓글을 작성해보세요."
          />
          <Button label="댓글" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  );
};

export default PostDetailPage;
