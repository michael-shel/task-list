import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Task } from '../models/task.interface';

export const loadTasks = createAction(
  '[Task/API] Load Tasks',
);

export const addTask = createAction(
  '[Task/API] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task/API] Update Task',
  props<{ task: Update<Task> }>()
);

export const deleteTask = createAction(
  '[Task/API] Delete Task',
  props<{ id: number }>()
);

export const loadTasksSuccess = createAction(
  '[Todo API] Tasks Load Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Todo API] Tasks Load Failure',
  props<{ error: string }>()
);