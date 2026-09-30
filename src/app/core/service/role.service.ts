import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.service';
import { environment } from '../../../environments/environment';
import { ApiResponseDTO } from '../../shared/dto/response/api-response.dto';
import { RoleResponseDTO } from '../../shared/dto/response/role-response.dto';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseHttpService {
  private readonly urlApiRole = environment.apiUrl.concat('/roles');

  getAllRole(): Observable<ApiResponseDTO<RoleResponseDTO[]>> {
    return this.getFindAll<RoleResponseDTO[]>(this.urlApiRole);
  }
}
