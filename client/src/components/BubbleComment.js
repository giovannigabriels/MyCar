import { diffTime } from "../helper";

export default function BubbleComment({ comment}) {
    // console.log(comment,"comment");
const diffTimee = diffTime(comment)
    return (
        <div className="chat chat-start">
        <div className="chat-header">
          {comment.User.name}
          <time className="text-xs opacity-50">{diffTimee}</time>
        </div>
        <div className="chat-bubble">{comment.text}</div>
      </div>
    );
  }
  