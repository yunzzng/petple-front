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
import { useState } from "react";
import { CommentType, ReplyType } from "@/types/post.type";
import userAuthStore from "@/zustand/userAuth";
import LikeButton from "./components/LikeButton";
import Header from "@/components/Header";

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
  });
  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => inValidateQuery(),
  });
  const { mutate: updateCommentMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => inValidateQuery(),
  });
  const { mutate: addReplyMutate } = useMutation({
    mutationFn: addReply,
    onSuccess: () => inValidateQuery(),
  });
  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => inValidateQuery(),
  });
  const { mutate: updateReplyMutate } = useMutation({
    mutationFn: updateReply,
    onSuccess: () => inValidateQuery(),
  });

  const onSubmit = ({ description }: CommentFormFields) => {
    if (!postId) return;
    if (submitType === "ADD_COMMENT") {
      addCommentMutate({ description, postId, hasParent: false });
    }
    if (submitType === "UPDATE_COMMENT" && targetComment?._id) {
      updateCommentMutate({ _id: targetComment?._id, description });
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

  return (
    <div className={styles.wrraper}>
      <Header />
      <CommunityPost post={post} />
      <LikeButton
        postId={postId}
        userId={user.userId}
        likes={post.likes}
        inValidateQuery={inValidateQuery}
      />
      <Comment
        comments={post.comments}
        handleReply={handleReply}
        signinedUserId={user.userId}
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
