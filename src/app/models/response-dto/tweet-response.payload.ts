export default interface TweetResponsePayload {

  id: number;
  name: string;
  username: string;
  description: string;
  commentNo: number;
  likeNo: number;
  createdAt: Date;
  tweetTimeDuration: String;
  fileContent: any[];
  userProfilePicture: any;
  likedByLoggedUser: boolean;
  hashtags: string[];

}
