import { Injectable } from '@angular/core';
import { Journal } from './utils.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getEntryOfADay(date: string): Observable<Journal> {
    const user = JSON.parse(localStorage.getItem('user')!);
    const options = {
      params: { uid: user.uid, date: date },
    };

    return this.http.get<Journal>(
      'http://localhost:8000/getJournalEntry',
      options
    );
  }
}
