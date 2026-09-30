import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../../shared/dto/response/api-response.dto';

export abstract class BaseHttpService {
  protected http = inject(HttpClient);

  protected getFindAll<T>(url: string, params?: HttpParams): Observable<ApiResponseDTO<T>> {
    return this.http.get<ApiResponseDTO<T>>(url, { params });
  }

  protected getFindById<T>(url: string, id: string): Observable<ApiResponseDTO<T>> {
    return this.http.get<ApiResponseDTO<T>>(`${url}/${id}`);
  }

  protected post<T>(url: string, body: unknown): Observable<ApiResponseDTO<T>> {
    return this.http.post<ApiResponseDTO<T>>(url, body);
  }

  protected put<T>(url: string, id: string, body: unknown): Observable<ApiResponseDTO<T>> {
    return this.http.put<ApiResponseDTO<T>>(`${url}/${id}`, body);
  }

  protected remove<T>(url: string, id: string): Observable<ApiResponseDTO<T>> {
    return this.http.delete<ApiResponseDTO<T>>(`${url}/${id}`);
  }
}
