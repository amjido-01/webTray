export interface User {
  id: number;
  email: string;
  phone: string;
  fullname: string;
  status: string | null;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface ApiResponse<T> {
  responseSuccessful: boolean;
  responseMessage: string;
  responseBody: T;
}


export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
}


export interface Business {
  id: number;
  userId: number;
  bussinessName: string;
  businessType: string;
  description: string;
  category: {
    main: string;
  };
  address: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  store: Array<{
    id: number;
    businessId: number;
    storeName: string;
    slogan: string;
    customDomain: string;
    paymentMethods: {
      paystack: boolean;
      bankTransfer: boolean;
    };
    deliveryOptions: {
      inHouse: boolean;
      thirdParty: string[];
    };
    status: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
  }>;
}
