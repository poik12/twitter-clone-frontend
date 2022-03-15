import CommentResponsePayload from "./comment-response.payload";
import PostResponsePayload from "./post-response.payload";

export default interface RepliedPostResponsePayload {

  post: PostResponsePayload;
  comments: CommentResponsePayload[];

};
