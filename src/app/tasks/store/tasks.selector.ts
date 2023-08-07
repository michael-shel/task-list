import { createSelector } from '@ngrx/store';
import { Task } from 'src/app/tasks/models/task.interface';
import { TasksState } from './tasks.reducers';

export const taskSelector = createSelector(
  (state: TasksState) => state.tasks,
  (state) => state.tasks
);

const routeParams = createSelector(
  (state: TasksState) => state.router.state,
  (state) => state.params
);

export const tasks = createSelector((state: TasksState) => state.tasks, state => state.tasks);

export const task = createSelector(
  taskSelector,
  routeParams,
  (tasks: Task[], { id }) => {
    return tasks.filter((t) => t._id === (id))[0];
  }
);

export const isLoadingSelector = createSelector((state: TasksState) => state, state => state.tasks.isLoading);

export const errorSelector = createSelector((state: TasksState) => state, state => state.error);

