import { CommentType } from "@/types/post.type";

interface CommentProps {
  comments: CommentType[];
  handleReply: (comment: CommentType) => void;
}

const Comment = ({ comments, handleReply }: CommentProps) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={`post-comment-${comment._id}`}>
          <div>
            <div>
              <img src={comment.creator.image} alt="댓글 작성자 이미지" />
              <p>
                {comment.creator.name}
                <span>{comment.creator.nickName}</span>
              </p>
            </div>
          </div>
          <p>{comment.description}</p>
          <button onClick={() => handleReply(comment)}>답글</button>
        </li>
      ))}
    </ul>
  );
};

export default Comment;
