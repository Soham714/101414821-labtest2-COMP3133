import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private baseURL = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.baseURL);
  }

  getLaunchById(id: number): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseURL}/${id}`);
  }
  getStatusColor(success: boolean): string {
    return success ? 'green' : 'red';
  }
  
  getFilteredLaunches(year?: string, launchSuccess?: string, landSuccess?: string): Observable<Launch[]> {
    let url = `${this.baseURL}?limit=100`;

    if (year) url += `&launch_year=${year}`;
    if (launchSuccess) url += `&launch_success=${launchSuccess}`;
    if (landSuccess) url += `&land_success=${landSuccess}`;

    return this.http.get<Launch[]>(url);
  }
}
