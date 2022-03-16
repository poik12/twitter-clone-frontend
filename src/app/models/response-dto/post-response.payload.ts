export default interface PostResponsePayload {

  id: number;
  name: string;
  username: string;
  description: string;
  commentNo: number;
  likeNo: number;
  createdAt: Date;
  postTimeDuration: String;

  fileContent: any[];
  userProfilePicture: any;

  likedByLoggedUser: boolean;
  hashtags: string[];

}
