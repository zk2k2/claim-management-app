import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiUrl = environment.apiUrl + '/contracts';
  constructor(private http: HttpClient) {}
  addContract(contract: any): Observable<any> {
    console.log('contract added');
    return this.http.post(`${this.apiUrl}/add`, contract);
  }

  getContractByNum(contractNum: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/contract/${contractNum}`);
  }

  getAllContractDtos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dtocontracts`);
  }
}
