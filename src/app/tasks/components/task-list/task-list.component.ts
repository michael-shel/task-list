import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { isLoadingSelector, tasks } from '../../store/tasks.selector';
import { TasksState } from '../../store/tasks.reducers';
import { deleteTask } from '../../store/tasks.actions';
import { Types } from '../../models/types';
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent{
  tasks$ = this.store.pipe(select(tasks));
  types = new Types().types;
  loading$ = this.store.pipe(select(isLoadingSelector));
  
  constructor(private store: Store<TasksState>, public notificationService: NotificationService,) {}

  fieldLabel(type: string, field: any) {
    const currentType = this.types.filter(t => t.id === type);
    return currentType[0].fields[field].label;
  }

  onDeleteTask(id: string) {
    this.notificationService.confirmation('', () => {
      this.store.dispatch(deleteTask({id}));
    },
    'Are you sure to delete the task?',
     () => {});
  }
}