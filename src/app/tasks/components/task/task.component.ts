import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { task } from '../../store/tasks.selector';
import { TasksState } from '../../store/tasks.reducers';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  task$ = this.store.pipe(select(task));
  constructor(private store: Store<TasksState>) {}

  ngOnInit(): void {}
}
