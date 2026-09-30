import { RoleResponseDTO } from "./role-response.dto";

export interface UserResponseDTO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  roles: RoleResponseDTO[];
}
