export interface ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
  path: string;
  timestamp: string;
}
