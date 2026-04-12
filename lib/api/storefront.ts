import { publicApi } from "../axios";
import { ApiResponse, Store, Order } from "@/types";

export interface CreateStorefrontOrderPayload {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  callbackUrl?: string;
  orderItems: {
    productId: number;
    quantity: number;
  }[];
}

export interface PaystackInitResponse {
  order: Order & { orderItems: any[] };
  payment: {
    transactionId: number;
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  order: Order;
  transaction: {
    id: number;
    status: string;
    reference: string;
    paidAt: string;
  };
  verified: boolean;
}

/**
 * Initialize a Paystack-based order on the storefront
 */
export const initializePaystackOrder = async (
  slug: string,
  payload: CreateStorefrontOrderPayload
) => {
  const { data } = await publicApi.post<ApiResponse<PaystackInitResponse>>(
    `/storefront/${slug}/order/paystack`,
    payload
  );

  if (!data?.responseSuccessful) {
    throw new Error(data?.responseMessage || "Failed to initialize payment");
  }

  return data.responseBody;
};

/**
 * Verify a Paystack payment on the storefront
 */
export const verifyPaystackPayment = async (
  slug: string,
  reference: string
) => {
  const { data } = await publicApi.get<ApiResponse<PaystackVerifyResponse>>(
    `/storefront/${slug}/order/paystack/verify/${reference}`
  );

  if (!data?.responseSuccessful) {
    throw new Error(data?.responseMessage || "Failed to verify payment");
  }

  return data.responseBody;
};
