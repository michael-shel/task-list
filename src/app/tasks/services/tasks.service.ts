import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task.interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  load(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.apiUrl + 'tasks').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + 'tasks/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  create(task: Task): Observable<{ task: Task }> {
    return this.http.post<{task: Task}>(environment.apiUrl + 'tasks', task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  update(task: Task): Observable<{ task: Task }> {
    return this.http.put<{task: Task}>(environment.apiUrl + 'tasks/' + task._id, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
