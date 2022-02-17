export default interface PostResponsePayload {

  id: number;
  name: string;
  username: string;
  description: string;
  postTimeDuration: String;
  createdAt: Date;

  fileContent: any;

  userProfilePicture: any;

}
