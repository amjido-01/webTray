export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  frequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  fullname: string;
  phone: string;
  email: string;
  password: string;
}


export interface VerifyOtpPayload {
  otp: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}