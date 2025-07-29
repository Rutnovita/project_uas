import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost/silomba_api/';

  constructor(private http: HttpClient) {}

  addPendaftar(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'add_pendaftar.php', data);
  }

  getPendaftar(): Observable<any> {
    return this.http.get(this.apiURL + 'get_pendaftar.php');
  }
}
