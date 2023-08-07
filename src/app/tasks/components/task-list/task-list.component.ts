import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { tasks } from '../../store/tasks.selector';
import { TasksState } from '../../store/tasks.reducers';
import { deleteTask } from '../../store/tasks.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent{
  tasks$ = this.store.pipe(select(tasks));
  
  constructor(private store: Store<TasksState>) {}

  onDeleteTask(id: string) {
    this.store.dispatch(deleteTask({id}));
  }
}