import { getPostById } from "@/apis/post.api";
import CommunityPost from "@/components/CommunityPost";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comment from "./components/Comment";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addComment,
  addReply,
  deleteReply,
  updateReply,
} from "@/apis/comment.api";
import { useState } from "react";
import { CommentType, ReplyType } from "@/types/post.type";
import userAuthStore from "@/zustand/userAuth";

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
  const user = userAuthStore();
  const { id: postId } = useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["Post", postId],
    queryFn: () => postId && getPostById(postId),
  });

  const { register, handleSubmit, setValue } = useForm<CommentFormFields>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(CommentSchema),
    mode: "onSubmit",
  });

  const { mutate: addCommentMutate } = useMutation({
    mutationFn: addComment,
  });
  const { mutate: addReplyMutate } = useMutation({
    mutationFn: addReply,
  });
  const { mutate: deleteReplyMutate } = useMutation({
    mutationFn: deleteReply,
  });
  const { mutate: updateReplyMutate } = useMutation({
    mutationFn: updateReply,
  });

  const onSubmit = ({ description }: CommentFormFields) => {
    if (!postId) return;
    // 최상위 댓글 추가 / 대댓글 분기
    // if (targetComment) {
    //   addReplyMutate({
    //     targetCommentId: targetComment._id,
    //     description,
    //     tag: targetComment.creator._id,
    //   });
    // } else {
    // addCommentMutate({ description, postId, hasParent: false });
    // }
    console.log(submitType);
    if (submitType === "ADD_COMMENT") {
      addCommentMutate({ description, postId, hasParent: false });
    }
    if (submitType === "UPDATE_COMMENT") {
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
  };

  const handleDeleteReply = (commentId: string, replyId: string) =>
    deleteReplyMutate({ commentId, replyId });

  const handleUpdateReply = (targetReply: ReplyType) => {
    setSubmitType("UPDATE_REPLY");
    setTargetReply(targetReply);
    setValue("description", targetReply.description);
  };

  const handleReply = (targetComment: CommentType) => {
    setSubmitType("ADD_REPLY");
    setTargetComment(targetComment);
  };

  return (
    <div>
      <CommunityPost post={post} />
      <Comment
        comments={post.comments}
        handleReply={handleReply}
        signinedUserId={user.userId}
        handleDeleteReply={handleDeleteReply}
        handleUpdateReply={handleUpdateReply}
      />
      <form>
        <div>
          {targetComment && <p>{targetComment.creator.nickName}</p>}
          <input type="text" {...register("description")} />
          <Button label="댓글" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  );
};

export default PostDetailPage;
