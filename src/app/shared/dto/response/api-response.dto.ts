export interface ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
  path: string;
  timestamp: string;
}

export interface PageResponseDTO<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
  path: string;
  timestamp: string;
  total: number;
}
