import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Veiculo, VeiculoInput } from './veiculo';

@Injectable({ providedIn: 'root' })
export class VeiculoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/veiculos`;

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.baseUrl);
  }

  buscarPorId(id: string): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.baseUrl}/${id}`);
  }

  criar(veiculo: VeiculoInput): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.baseUrl, veiculo);
  }

  atualizar(id: string, veiculo: VeiculoInput): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.baseUrl}/${id}`, veiculo);
  }

  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
