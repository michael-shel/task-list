import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Task } from '../models/task.interface';

export const loadTasks = createAction(
  '[Task/API] Load Tasks',
);

export const loadTasksSuccess = createAction(
  '[Todo API] Tasks Load Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Todo API] Tasks Load Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Task/API] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Todo API] Tasks Create Success',
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  '[Todo API] Tasks Create Failure',
  props<{ error: string }>()
);

export const updateTask = createAction(
  '[Task/API] Update Task',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Todo API] Tasks Update Success',
  props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
  '[Todo API] Tasks Create Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Task/API] Delete Task',
  props<{ id: string }>()
);

export const deleteTasksSuccess = createAction(
  '[Todo API] Tasks Delete Success',
  props<{ id: string }>()
);

export const deleteTasksFailure = createAction(
  '[Todo API] Tasks Delete Failure',
  props<{ error: string }>()
);
