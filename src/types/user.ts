export interface UserType extends UserCredentialsType {
  isAuth: boolean;
  username: string;
}

export interface UserCredentialsType {
  email: string;
  password: string;
}
