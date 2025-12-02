export type LoginInputs = {
  nickname: string;
  password: string;
  keepLoggedIn: boolean;
};

export type RegistrationInputs = {
  nickname: string;
  country: string;
  birthdate: string;
  email: string;
  password: string;
  confirmPassword: string;
};
