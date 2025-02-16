import { CommentType, ReplyType } from "@/types/post.type";
import { useState } from "react";
import defaultUserImage from "/images/profile.png";

interface CommentProps {
  comments: CommentType[];
  signinedUserId: string | null;
  handleReply: (comment: CommentType) => void;
  handleDeleteReply: (commentId: string, replyId: string) => void;
  handleUpdateReply: (targetReply: ReplyType) => void;
  handleDeleteComment: (id: string) => void;
  handleUpdateComment: (id: string) => void;
}

const Comment = ({
  comments,
  signinedUserId,
  handleReply,
  handleDeleteReply,
  handleUpdateReply,
  handleDeleteComment,
  handleUpdateComment,
}: CommentProps) => {
  console.log(comments);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ul>
      {comments.map((comment) => (
        <li key={`post-comment-${comment._id}`}>
          <div>
            <div>
              <img
                src={comment.creator.image || defaultUserImage}
                alt="댓글 작성자 이미지"
              />
              <p>
                {comment.creator.name}
                <span>{comment.creator.nickName}</span>
              </p>
            </div>
            <div>
              {comment.replies.length > 0 && (
                <p onClick={() => setIsOpen(true)}>
                  {comment.replies.length}개의 답글
                </p>
              )}
              <ul>
                {comment.replies.map((reply) => (
                  <li>
                    <p>{reply.description}</p>
                    {reply.creatorId === signinedUserId && (
                      <div>
                        <button
                          onClick={() => {
                            handleReply(comment);
                            handleUpdateReply(reply);
                          }}
                        >
                          수정
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReply(comment._id, reply._id)
                          }
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p>{comment.description}</p>
          {signinedUserId === comment.creator._id && (
            <div>
              <button onClick={() => handleUpdateComment(comment._id)}>
                댓글수정
              </button>
              <button onClick={() => handleDeleteComment(comment._id)}>
                댓글삭제
              </button>
            </div>
          )}
          <button onClick={() => handleReply(comment)}>답글</button>
        </li>
      ))}
    </ul>
  );
};

export default Comment;
