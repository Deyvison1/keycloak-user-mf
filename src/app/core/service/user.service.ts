import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';
import { environment } from '../../../environments/environment';
import { ApiResponseDTO } from '../../shared/dto/response/api-response.dto';
import { UserResponseDTO } from '../../shared/dto/response/user-response.dto';
import { UserRequestDTO } from '../../shared/dto/request/user-request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpService {
  private readonly urlApiUser = environment.apiUrl.concat('/users');

  getAllUser(): Observable<ApiResponseDTO<UserResponseDTO[]>> {
    return this.getFindAll<UserResponseDTO[]>(this.urlApiUser);
  }

  findById(id: string): Observable<ApiResponseDTO<UserResponseDTO>> {
    return this.getFindById<UserResponseDTO>(this.urlApiUser, id);
  }

  insertUser(userDTO: UserRequestDTO): Observable<ApiResponseDTO<UserResponseDTO>> {
    return this.post<UserResponseDTO>(this.urlApiUser, userDTO);
  }

  editUser(id: string, userDTO: UserRequestDTO): Observable<ApiResponseDTO<UserResponseDTO>> {
    return this.put<UserResponseDTO>(this.urlApiUser, id, userDTO);
  }

  deleteUser(id: string): Observable<ApiResponseDTO<void>> {
    return this.remove<void>(this.urlApiUser, id);
  }
}
