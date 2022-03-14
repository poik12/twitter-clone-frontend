import FollowerDto from "./follower-response.payload";
import PostResponsePayload from "./post-response.payload";

export default interface UserDetailsResponsePayload {

  id: number;
  name: string;
  username: string;
  createdAt: string;
  tweetNo: number;
  followingNo: number;
  followerNo: number;
  description: string;
  userProfilePicture: any;
  userBackgroundPicture: any;

  followers: Array<FollowerDto>;
  following: Array<FollowerDto>;

}