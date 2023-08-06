// import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
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

// const selectRouter = createFeatureSelector<fromRouter.RouterReducerState>('router');

// const {
//   selectQueryParams,    // select the current route query params
//   selectQueryParam,     // factory function to select a query param
//   selectRouteParams,    // select the current route params
//   selectRouteParam,     // factory function to select a route param
//   selectRouteData,      // select the current route data
//   selectUrl,            // select the current url
// } = fromRouter.getRouterSelectors(selectRouter);

export const tasks = createSelector((state: TasksState) => state.tasks, state => state.tasks);

export const task = createSelector(
  taskSelector,
  routeParams,
  // selectRouteParams,
  (tasks: Task[], { id }) => {
    return tasks.filter((t) => t.id === Number(id))[0];
  }
);

export const isLoadingSelector = createSelector((state: TasksState) => state, state => state.isLoading);

export const errorSelector = createSelector((state: TasksState) => state, state => state.error);

