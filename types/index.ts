import { ReactNode } from "react";

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
  store?: Store | null;
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
  storeId: number;
  name: string;
  description: string;
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
  store: Store[]
}


export interface DashboardSummary {
  totalRevenue: number;
  noOfOrders: number;
  noOfProducts: number;
  noOfCustomers: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[]; // You can type this more specifically based on your Order type
}
export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  product?: {
    name: string;
    price: string;
  };
};

export type Customer = {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  totalOrders: number;
  totalSpent: number;
  status?: 'active' | 'inactive';  // Optional since it's not in API response
};

export type Order = {
  // Original API fields
  id: number;
  storeId: number;
  customerId: number;
  status: "pending" | "shipped" | "cancel" | "completed";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  customer: Customer | null;
  orderItems: OrderItem[];
  
  // Formatted fields for UI compatibility
  orderId?: number;
  customerName?: string;
  customerEmail?: string;
  date?: string;
  items?: OrderItem[];
  total?: number;
};


// customerId: 2
// id: 2
// orderItems: Array [ {…} ]
// status: "pending"
// storeId: 13
// totalAmount: "100000"
// updatedAt: "2025-07-03T04:41:01.084Z"

export interface OrderSummary {
  totalNumberOfLowStockItems: number;
  totalNumberOfOrders: number;
  totalNumberOfPendingOrders: number;
  totalSales: number;
}
export interface CustomerSummary {
 totalCustomer: number;
  newCustomer: number;
  retentionRate: number;
  topSpenders: {
    name: string;
    totalSpent: number;
  }
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
export interface UpdateProductPayload {
  id: number;
  name?: string;
  price?: number;
  quantity?: number;
  description?: string;
  // categoryId?: string; // Add this if your API supports category updates
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

export interface EditForm {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  categoryId?: number;
}

export interface StatCardProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  note: string;
  noteColor?: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
}

// Types
export interface StoreFrontSummary {
  numberOfProducts: number;
  numberOfCategories: number;
  numberOfCustomers: number;
}


export interface StoreProduct {
  id: number;
  storeId: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  images: {
    main: string;
    thumbnail: string;
  };
  visible: boolean;
  feature: boolean;
  createdAt: string;
  updatedAt: string;
}
