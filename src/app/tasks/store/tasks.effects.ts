import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, debounceTime, delay, withLatestFrom, catchError, tap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { TasksService } from '../services/tasks.service';
import { loadTasks, addTask, updateTask, deleteTask, loadTasksSuccess, loadTasksFailure, deleteTasksSuccess, deleteTasksFailure, addTaskSuccess, addTaskFailure, updateTaskSuccess, updateTaskFailure } from './tasks.actions';
import { from, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.interface';
import { Update } from '@ngrx/entity';

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
          delay(1000),
          // Take the returned value and return a new success action containing the todos
          map((tasks) => loadTasksSuccess({ tasks: tasks })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) =>
        from(this.service.delete(action.id)).pipe(
          // Take the returned value and return a new success action containing the todos
          map((tasks) => deleteTasksSuccess({ id: action.id })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(deleteTasksFailure({ error })))
        )
      )
    )
  );

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

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) => {
        return this.service.update(action.task).pipe(
          map((data) => {
            const updatedTask: Update<Task> = {
              id: action.task._id,
              changes: {
                ...action.task,
              },
            };
            return updateTaskSuccess({ task: updatedTask });
          }),
          catchError((error) => of(updateTaskFailure({ error })))
        );
      })
    );
  });
}