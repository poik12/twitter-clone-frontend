import FollowerDto from "./follower-response.payload";

export default interface UserDetailsResponsePayload {

  id: number;
  name: string;
  username: string;
  createdAt: string;
  tweetNo: number;
  followingNo: number;
  followerNo: number;
  notificationNo: number;
  description: string;
  userProfilePicture: any;
  userBackgroundPicture: any;

  followers: Array<FollowerDto>;
  following: Array<FollowerDto>;

}
