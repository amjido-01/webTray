import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse, Order, OrderSummary } from "@/types";

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customerName: string;
  phone: string;
  orderItems: OrderItem[];
}

export interface UpdateOrderPayload {
  customerName?: string;
  phone?: string;
  orderItems?: OrderItem[];
  status?: string;
}

// API Response Order Item Structure
export interface ApiOrderItem {
  id: number;
  orderId: number;
  productId: number;
  price: string;
  quantity: number;
  subTotal: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Order Structure
export interface ApiOrder {
  id: number;
  storeId: number;
  customerId: number;
  totalAmount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderItems: ApiOrderItem[];
}

export interface OrderResponse {
  order: ApiOrder;
}

export interface OrdersResponse {
  orders: ApiOrder[];
}

// Query Keys
export const orderKeys = {
  all: ["orders"] as const,
  orders: () => [...orderKeys.all, "list"] as const,
  order: (id: number) => [...orderKeys.all, "detail", id] as const,
  summary: () => [...orderKeys.all, "summary"] as const,
};

export const useOrder = () => {
  const queryClient = useQueryClient();

  // List Orders Query
  const ordersQuery = useQuery({
    queryKey: orderKeys.orders(),

    queryFn: async (): Promise<Order[]> => {
      const { data } = await api.get<ApiResponse<{ orders: Order[] }>>(
        "/inventory/order"
      );
      if (data?.responseSuccessful) {
        return data.responseBody.orders;
      }
      throw new Error(data?.responseMessage || "Failed to fetch orders");
    },
  });

  // Order Summary Query
  const orderSummaryQuery = useQuery({
    queryKey: orderKeys.summary(),
    queryFn: async (): Promise<OrderSummary> => {
      const { data } = await api.get<ApiResponse<OrderSummary>>(
        "/inventory/order/summary"
      );
      console.log(data)
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch order summary");
    },
  });

  // Single Order Hook
  const useOrderQuery = (id: number) =>
    useQuery({
      queryKey: orderKeys.order(id),
      queryFn: async (): Promise<Order> => {
        const { data } = await api.get<ApiResponse<{ order: Order }>>(
          `/inventory/order/${id}`
        );
        if (data?.responseSuccessful) {
          return data.responseBody.order;
        }
        throw new Error(data?.responseMessage || "Failed to fetch order");
      },
      enabled: !!id,
    });

  // Get Order Function
  const getOrder = async (id: number): Promise<Order> => {
    const { data } = await api.get<ApiResponse<{ order: Order }>>(
      `/inventory/order/${id}`
    );
    if (data?.responseSuccessful) {
      return data.responseBody.order;
    }
    throw new Error(data?.responseMessage || "Failed to fetch order");
  };

  // Add Order Mutation
  const addOrderMutation = useMutation({
    mutationFn: async (payload: CreateOrderPayload): Promise<ApiOrder> => {
      const { data } = await api.post<ApiResponse<ApiOrder>>(
        "/inventory/order",
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to add order");
    },
    onSuccess: (newOrder) => {
      // Invalidate and refetch orders and summary
      queryClient.invalidateQueries({ queryKey: orderKeys.orders() });
      queryClient.invalidateQueries({ queryKey: orderKeys.summary() });

      // Optimistically update the orders cache
      queryClient.setQueryData<ApiOrder[]>(orderKeys.orders(), (old) => {
        return old ? [newOrder, ...old] : [newOrder];
      });

      toast.success("Order added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add order");
    },
  });

  // Update Order Mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: UpdateOrderPayload }): Promise<ApiOrder> => {
      const { data } = await api.put<ApiResponse<ApiOrder>>(
        `/inventory/order/${id}`,
        payload
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to update order");
    },
    onSuccess: (updatedOrder) => {
      // Invalidate and refetch orders and summary
      queryClient.invalidateQueries({ queryKey: orderKeys.orders() });
      queryClient.invalidateQueries({ queryKey: orderKeys.summary() });
      queryClient.invalidateQueries({ queryKey: orderKeys.order(updatedOrder.id) });

      // Optimistically update the orders cache
      queryClient.setQueryData<ApiOrder[]>(orderKeys.orders(), (old) => {
        return old ? old.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        ) : [updatedOrder];
      });

      // Update single order cache
      queryClient.setQueryData<ApiOrder>(orderKeys.order(updatedOrder.id), updatedOrder);

      toast.success("Order updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update order");
    },
  });

  // Delete Order Mutation
  const deleteOrderMutation = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const { data } = await api.delete<ApiResponse<void>>(
        `/inventory/order/${id}`
      );
      if (!data?.responseSuccessful) {
        throw new Error(data?.responseMessage || "Failed to delete order");
      }
    },
    onSuccess: (_, deletedOrderId) => {
      // Invalidate and refetch orders and summary
      queryClient.invalidateQueries({ queryKey: orderKeys.orders() });
      queryClient.invalidateQueries({ queryKey: orderKeys.summary() });

      // Remove from orders cache
      queryClient.setQueryData<ApiOrder[]>(orderKeys.orders(), (old) => {
        return old ? old.filter(order => order.id !== deletedOrderId) : [];
      });

      // Remove single order cache
      queryClient.removeQueries({ queryKey: orderKeys.order(deletedOrderId) });

      toast.success("Order deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete order");
    },
  });

  const addOrder = async (payload: CreateOrderPayload) => {
    return addOrderMutation.mutateAsync(payload);
  };

  const updateOrder = async (id: number, payload: UpdateOrderPayload) => {
    return updateOrderMutation.mutateAsync({ id, payload });
  };

  const deleteOrder = async (id: number) => {
    return deleteOrderMutation.mutateAsync(id);
  };

  return {
    // Data
    orders: ordersQuery.data,
    orderSummary: orderSummaryQuery.data,

    // Loading states
    isFetchingOrders: ordersQuery.isLoading,
    isFetchingOrderSummary: orderSummaryQuery.isLoading,
    isAddingOrder: addOrderMutation.isPending,
    isUpdatingOrder: updateOrderMutation.isPending,
    isDeletingOrder: deleteOrderMutation.isPending,

    // Error states
    ordersError: ordersQuery.error,
    orderSummaryError: orderSummaryQuery.error,
    addOrderError: addOrderMutation.error,
    updateOrderError: updateOrderMutation.error,
    deleteOrderError: deleteOrderMutation.error,

    // Success states
    addOrderSuccess: addOrderMutation.isSuccess,
    updateOrderSuccess: updateOrderMutation.isSuccess,
    deleteOrderSuccess: deleteOrderMutation.isSuccess,

    // Functions
    refetchOrders: ordersQuery.refetch,
    refetchOrderSummary: orderSummaryQuery.refetch,
    getOrder,
    useOrderQuery,
    addOrder,
    updateOrder,
    deleteOrder,

    // Reset functions
    resetAddOrder: addOrderMutation.reset,
    resetUpdateOrder: updateOrderMutation.reset,
    resetDeleteOrder: deleteOrderMutation.reset,
  };
};