export type StudioCategory =
  | "Photo Studio"
  | "Sound Stage"
  | "Podcast Lounge"
  | "Music Suite"
  | "Workshop";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Studio {
  _id: string;
  title: string;
  category: StudioCategory;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  hostImage?: string;
  rating: number;
  reviewCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  creatorImage?: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  duration: number;
  hourlyRate: number;
  rentalAmount: number;
  securityDeposit: number;
  totalAmount: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  user?: User;
  token?: string;
  errors?: any;
}
