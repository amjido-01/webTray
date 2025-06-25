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
  business?: Business | null;
  store?: Store | null
}


export interface Store {
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

export interface DashboardSummary {
  totalRevenue: number;
  noOfOrders: number;
  noOfProducts: number;
  noOfCustomers: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[]; // You can type this more specifically based on your Order type
}

export interface Order {
  id: string;
  customer: string;
  status: "Processing" | "Completed" | "Pending"; // you can add more statuses as needed
  price: number;
  date: string;
  items: string[];
  email: string;
}


export interface CreateRegistrationPayload {
  businessName: string;
  description: string;
  businessType: string;
  category: {
    main: string;
  };
  address: string;
  storeName: string;
  slogan: string;
  customeDomain: string;
  currency: string;
  paymentMethods: {
    paystack: boolean;
    bankTransfer: boolean;
  };
  deliveryOptions: {
    inHouse: boolean;
    thirdParty: string[];
  };
}

export interface Register {
  message: string;
  status: number;
  data: {
    businessId: string;
  };
}

export interface ProductImages {
  main: string;
  thumbnail: string;
}


export interface CreateProductPayload {
  storeId: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: ProductImages;
}

export interface Product {
  id: number;
  storeId: number;
  categoryId: number;
  name: string;
  description: string;
  price: string; 
  quantity: number;
  images: ProductImages;
  createdAt: string;
  updatedAt: string;
}

export interface InventorySummary {
  noOfProducts: number;
  noOfLowStocksItems: number;
  totalValueOfProducts: number;
  noOfCategories: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
}
