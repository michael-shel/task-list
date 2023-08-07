import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import { TasksService } from '../services/tasks.service';
import { NotificationService } from "../../services/notification.service";
import {
  loadTasks,
  addTask,
  updateTask,
  deleteTask,
  loadTasksSuccess,
  loadTasksFailure,
  deleteTasksSuccess,
  deleteTasksFailure,
  addTaskSuccess,
  addTaskFailure,
  updateTaskSuccess,
  updateTaskFailure
} from './tasks.actions';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private service: TasksService,
    public notificationService: NotificationService,
    private router: Router) { }

  // Run this code when a loadTasks action is dispatched
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        // Call the loadTasks method, convert it to an observable
        from(this.service.load()).pipe(
          // Take the returned value and return a new success action containing the tasks
          map((tasks) => loadTasksSuccess({ tasks: tasks })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  // Run this code when a deleteTasks action is dispatched
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) =>
        from(this.service.delete(action.id)).pipe(
          map((tasks) => {
            this.notificationService.success("Task Deleted");
            return deleteTasksSuccess({ id: action.id })
          }),
          catchError((error) => {
            this.notificationService.error(error.status + ': ' + error.statusText);
            return of(deleteTasksFailure({ error }))
          })
        )
      )
    )
  );

  // Run this code when a addTask action is dispatched
  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action) => {
        return this.service.create(action.task).pipe(
          map((data: any) => {
            this.notificationService.success("Task Added");
            this.router.navigate(['/tasks']);
            return addTaskSuccess({ task: data });
          }),
          catchError((error) => {
            this.notificationService.error(error.status + ': ' + error.statusText);
            return of(addTaskFailure({ error }))
          })
        );
      })
    );
  });

  // Run this code when a updateTask action is dispatched
  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) => {
        return this.service.update(action.task).pipe(
          map((data: any) => {
            this.notificationService.success("Task Updated");
            this.router.navigate(['/tasks']);
            return updateTaskSuccess({ task: data });
          }),
          catchError((error) => {
            this.notificationService.error(error.status + ': ' + error.statusText);
            return of(updateTaskFailure({ error }))
          })
        );
      })
    );
  });
}