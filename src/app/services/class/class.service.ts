import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/interfaces/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url = 'http://localhost:8080/class';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {

    return this.http.get<Class[]>(this.url);
  }

  getClass(id:number){
    return this.http.get<Class>(`${this.url}/${id}`);
  }

  save(classe : Class): Observable<Class>{
    return this.http.post<Class>(this.url, classe);
  }

  update(classe : Class): Observable<Class>{
    return this.http.put<Class>(`${this.url}/${classe.id}`, classe)
  }

  delete(classe : Class): Observable<void>{
    return this.http.delete<void>(`${this.url}/${classe.id}`);
  }
}
