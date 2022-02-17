export enum NotificationMessage {
  // REGISTRATION
  RegistrationSuccess = 'Registration was Successfull! Please check Your mailbox.',
  RegistrationError = 'Registration Failed! Please try again',

  // LOGIN
  LoginSuccess = 'Login Successful',
  LoginError = 'Bad credentials. Please try again',

  // POST
  PostAddedSuccessfully = 'Post has been added successfully',
  PostAddedError = 'Something went wrong while adding the post',
  PostDeletedSuccessfully = 'Post has been deleted succesfully',

  // COMMENT
  CommentAddedSuccessfully = 'Comment has been added successfully',
  CommentAddedError = 'Something went wrong while adding the comment',

  // PROFILE
  AccountUpdatedSuccessfully = 'Your account has been updated',
  FollowUser = 'User followed',
  UnfollowUser = "User unfollowed",

  // LOGOUT
  Logout = 'You have been logout'

}
