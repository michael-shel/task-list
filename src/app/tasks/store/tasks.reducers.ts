import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.interface';
import * as TaskActions from './tasks.actions';
import { RouterReducerState } from '@ngrx/router-store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

// export interface TasksState {
//   isLoading?: boolean;
//   error?: string | null;
//   tasks?: Task[] | any;
//   router?: RouterReducerState<any>;
// }

export interface TasksState extends EntityState<Task> {
  isLoading?: boolean;
  error?: string | null;
  tasks?: Task[] | any;
  router?: RouterReducerState<any>;
}

export const adapter = createEntityAdapter<Task>();

// export const initialState: TasksState = adapter.getInitialState({
//   tasks: [],
//   error: null,
//   isLoading: false,
// });

export const initialState: TasksState = adapter.getInitialState({
  error: null,
  loading: false,
  selectedId: null,
});

export const tasksReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new task to the tasks array
  on(TaskActions.addTask, (state) => ({ ...state, isLoading: true })),
  // Handle tasks delete success
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, { ...task }],
    error: null,
    isLoading: false
  })),
  // Handle tasks delete failure
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false
  })),
  // Handle the task update
  on(TaskActions.updateTask, (state) => ({ ...state, isLoading: true })),
  // Handle the task update success
  // on(TaskActions.updateTaskSuccess, (state, { task }) => ({
  //   ...state,
  //   tasks: state.tasks[state.tasks.findIndex(x => x._id === task.id)] = task.changes,
  //   error: null,
  //   isLoading: false
  // })),
  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    adapter.updateOne(
      { id: Number(task.id), changes: task.changes },
      { ...state, loading: false }
    )
  ),
  // Handle the task update failure
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false
  })),
  // Remove the task from the tasks array
  on(TaskActions.deleteTask, (state) => ({ ...state, isLoading: true })),
  // Handle tasks delete success
  on(TaskActions.deleteTasksSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task._id !== id),
    error: null,
    isLoading: false
  })),
  // Handle tasks delete failure
  on(TaskActions.deleteTasksFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false
  })),
  // Trigger loading the tasks
  on(TaskActions.loadTasks, (state) => ({ ...state, isLoading: true })),
  // Handle successfully loaded tasks
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: null,
    isLoading: false
  })),
  // Handle tasks load failure
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false
  }))
);