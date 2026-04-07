// hooks/use-customer-orders.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  itemCount: number;
  items: OrderItem[];
  shippingAddress: string;
  deliveryFee: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query keys
export const orderKeys = {
  all: ["orders"] as const,
  store: (slug: string) => [...orderKeys.all, slug] as const,
  list: (slug: string, page: number, status?: string) =>
    [...orderKeys.store(slug), "list", page, status] as const,
};

// Get customer token for a store
export const getCustomerToken = (slug: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`customerToken_${slug}`);
};

// Set customer token for a store
export const setCustomerToken = (slug: string, token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`customerToken_${slug}`, token);
};

export const useCustomerOrders = (
  slug: string,
  page: number = 1,
  status?: string
) => {
  const customerToken = getCustomerToken(slug);

  return useQuery({
    queryKey: orderKeys.list(slug, page, status),
    queryFn: async (): Promise<OrdersResponse> => {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (status && status !== "all") {
        params.set("status", status);
      }

      const { data } = await api.get<ApiResponse<OrdersResponse>>(
        `/storefront/${slug}/orders?${params.toString()}`,
        {
          headers: {
            "X-Customer-Token": customerToken || "",
          },
        }
      );

      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch orders");
    },
    enabled: !!customerToken,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
