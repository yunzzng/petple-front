import { getPostById } from "@/apis/post.api";
import CommunityPost from "@/components/CommunityPost";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comment from "./components/Comment";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addComment, addReply } from "@/apis/comment.api";
import { useState } from "react";
import { CommentType } from "@/types/post.type";
import userAuthStore from "@/zustand/userAuth";

const CommentSchema = z.object({
  description: z.string().trim().min(1, "내용을 입력해주세요."),
});

type CommentFormFields = z.infer<typeof CommentSchema>;

const PostDetailPage = () => {
  const [targetComment, setTargetComment] = useState<CommentType>();
  const user = userAuthStore();
  const { id: postId } = useParams();
  const { data: post } = useSuspenseQuery({
    queryKey: ["Post", postId],
    queryFn: () => postId && getPostById(postId),
  });

  const { register, handleSubmit } = useForm<CommentFormFields>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(CommentSchema),
    mode: "onSubmit",
  });

  const { mutate: commentMutate } = useMutation({
    mutationFn: addComment,
  });
  const { mutate: replyMutate } = useMutation({
    mutationFn: addReply,
  });

  const onSubmitComment = ({ description }: CommentFormFields) => {
    console.log("submit");
    console.log(user);
    if (!postId) return;
    // 최상위 댓글 추가 / 대댓글 분기
    if (targetComment) {
      replyMutate({
        targetCommentId: targetComment._id,
        description,
        tag: targetComment.creator.nickName,
      });
    } else {
      commentMutate({ description, postId, hasParent: false });
    }
  };

  const handleReply = (targetComment: CommentType) =>
    setTargetComment(targetComment);
  return (
    <div>
      <CommunityPost post={post} />
      <Comment comments={post.comments} handleReply={handleReply} />
      <form>
        <div>
          {targetComment && <p>{targetComment.creator.nickName}</p>}
          <input type="text" {...register("description")} />
          <Button label="댓글" onClick={handleSubmit(onSubmitComment)} />
        </div>
      </form>
    </div>
  );
};

export default PostDetailPage;
