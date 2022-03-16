import CommentResponsePayload from "./comment-response.payload";
import TweetResponsePayload from "./tweet-response.payload";

export default interface RepliedTweetResponsePayload {

  tweet: TweetResponsePayload;
  comments: CommentResponsePayload[];

};
