export interface UserRequestDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  password?: string;
}
