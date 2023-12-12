import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../../interfaces/teacher';

@Injectable({
  providedIn: 'root'
})
export class ManageTeacherService {
  url = 'http://localhost:8080/teachers'

  constructor(private http: HttpClient) { }

  getTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url);
  }

  save(teacher : Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(this.url, teacher);
  }

  update(teacher : Teacher): Observable<Teacher>{
    return this.http.put<Teacher>(`${this.url}/${teacher.id}`, teacher)
  }

  delete(teacher : Teacher): Observable<void>{
    return this.http.delete<void>(`${this.url}/${teacher.id}`);
  }

}
