import { ApiResponse, Booking, BookingStatus, Studio, User } from "@/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: "include", // Essential for HTTPOnly JWT session cookies!
  });

  let data: any;
  try {
    data = await response.json();
  } catch (err) {
    data = { success: false, message: response.statusText || "Server error" };
  }

  if (!response.ok) {
    const error: any = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// Studio API methods
export const studioApi = {
  async getAll(params?: {
    search?: string;
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    limit?: number;
    hostId?: string;
  }): Promise<{ success: boolean; data: Studio[]; count: number }> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, String(value));
        }
      });
    }
    const qStr = query.toString();
    const endpoint = `/api/studios${qStr ? `?${qStr}` : ""}`;
    return apiClient<Studio[]>(endpoint, { method: "GET" }) as any;
  },

  async getById(id: string): Promise<{ success: boolean; data: Studio }> {
    return apiClient<Studio>(`/api/studios/${id}`, { method: "GET" }) as any;
  },

  async create(payload: any): Promise<{ success: boolean; data: Studio; message: string }> {
    return apiClient<Studio>("/api/studios", {
      method: "POST",
      body: JSON.stringify(payload),
    }) as any;
  },

  async update(id: string, payload: any): Promise<{ success: boolean; data: Studio; message: string }> {
    return apiClient<Studio>(`/api/studios/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }) as any;
  },

  async delete(id: string): Promise<{ success: boolean; message?: string }> {
    return apiClient(`/api/studios/${id}`, {
      method: "DELETE",
    });
  },
};

// Booking API methods
export const bookingApi = {
  async create(payload: {
    studioId: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }): Promise<{ success: boolean; data: Booking; message: string }> {
    return apiClient<Booking>("/api/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    }) as any;
  },

  async getMy(): Promise<{ success: boolean; data: Booking[]; count: number }> {
    return apiClient<Booking[]>("/api/bookings/my", { method: "GET" }) as any;
  },

  async getHost(): Promise<{ success: boolean; data: Booking[]; count: number }> {
    return apiClient<Booking[]>("/api/bookings/host", { method: "GET" }) as any;
  },

  async cancel(id: string): Promise<{ success: boolean; data: Booking; message: string }> {
    return apiClient<Booking>(`/api/bookings/${id}/cancel`, {
      method: "PATCH",
    }) as any;
  },

  async updateStatus(
    id: string,
    status: BookingStatus
  ): Promise<{ success: boolean; data: Booking; message: string }> {
    return apiClient<Booking>(`/api/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }) as any;
  },
};

// Misc API methods
export const miscApi = {
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message?: string }> {
    return apiClient("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  async getWishlist(): Promise<{ success: boolean; data: Studio[]; savedIds: string[] }> {
    return apiClient("/api/wishlist", { method: "GET" }) as any;
  },

  async toggleWishlist(studioId: string): Promise<{ success: boolean; saved: boolean; message: string }> {
    return apiClient("/api/wishlist/toggle", {
      method: "POST",
      body: JSON.stringify({ studioId }),
    }) as any;
  },
};
