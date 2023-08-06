import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, debounceTime, delay, withLatestFrom, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { TasksService } from '../services/tasks.service';
import { loadTasks, addTask, updateTask, deleteTask, loadTasksSuccess, loadTasksFailure } from './tasks.actions';
import { from, of } from 'rxjs';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private service: TasksService) {}

    // Run this code when a loadTasks action is dispatched
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
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
}