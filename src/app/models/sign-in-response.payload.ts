export default interface SignInResponsePayload {

  username: string;
  authenticationToken: string;
  expiresAt: Date;
  refreshToken: string;

}
