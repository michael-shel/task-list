import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import {
  tasksReducer,
  TasksState,
} from './tasks.reducers';

export const reducers: ActionReducerMap<TasksState> = {
  tasks: tasksReducer,
  router: routerReducer,
  ids: undefined,
  entities: undefined
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    return reducer(state, action);
  };
};

const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    return reducer(undefined, { type: INIT });
  };
};

export const metaReducers: MetaReducer<TasksState>[] = environment.production
  ? [logoutMeta] : [debugMeta];
