import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import { TasksService } from '../services/tasks.service';
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
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private service: TasksService) { }

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
          map((tasks) => deleteTasksSuccess({ id: action.id })),
          catchError((error) => of(deleteTasksFailure({ error })))
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
          map((data) => {
            const task = { ...action.task, _id: uuidv4() };
            return addTaskSuccess({ task });
          }),
          catchError((error) => of(addTaskFailure({ error })))
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
          map((data) => {
            return updateTaskSuccess({ task: action.task });
          }),
          catchError((error) => of(updateTaskFailure({ error })))
        );
      })
    );
  });
}