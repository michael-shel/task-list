import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.interface';
import * as TaskActions from './tasks.actions';
import { RouterReducerState } from '@ngrx/router-store';

export interface TasksState {
  isLoading?: boolean;
  error?: string | null;
  tasks: Task[] | any;
  router?: RouterReducerState<any>;
}

export const initialState: TasksState = {
  tasks: [],
  error: null,
  isLoading: false,
};

export const tasksReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new task to the tasks array
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, { id: Number(Date.now().toString()), ...task }],
  })),
  // Remove the task from the tasks array
  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    todos: state.tasks.filter((task) => task.id !== id),
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