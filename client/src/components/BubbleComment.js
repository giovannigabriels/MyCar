import { diffTime } from "../helper";

export default function BubbleComment({ comment }) {
  const diffTimee = diffTime(comment);
  return (
    <div className="chat chat-start mb-2">
      <div className="chat-header mb-2">
        {comment.User.name}
        <time className="text-xs opacity-50 mx-10">{diffTimee}</time>
      </div>
      <div className="chat-bubble">{comment.text}</div>
    </div>
  );
}
 