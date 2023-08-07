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
    return this.http.get<Task[]>(environment.apiUrl + 'tasks')
  }

  delete(id: string) {
    return this.http.delete(environment.apiUrl + 'tasks/' + id)
  }

  create(task: Task): Observable<{ task: Task }> {
    return this.http.post<{task: Task}>(environment.apiUrl + 'tasks', task)
  }

  update(task: Task): Observable<{ task: Task }> {
    return this.http.put<{task: Task}>(environment.apiUrl + 'tasks/' + task._id + '132321', task)
  }
}
