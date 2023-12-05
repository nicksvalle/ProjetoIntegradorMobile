import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class ManageCourseService {
  url = 'http://localhost:8080/course';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {

    return this.http.get<Course[]>(this.url);
  }

  getCourse(id:number){
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  getCoursesList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/courses`);
  }

  save(course : Course): Observable<Course>{
    return this.http.post<Course>(this.url, course);
  }

  update(course : Course): Observable<Course>{
    return this.http.put<Course>(`${this.url}/${course.id}`, course)
  }

  delete(course : Course): Observable<void>{
    return this.http.delete<void>(`${this.url}/${course.id}`);
  }
}
