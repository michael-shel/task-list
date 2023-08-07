import { Component, OnInit } from '@angular/core';
import { loadTasks } from './tasks/store/tasks.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-list';
  constructor(private store: Store) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(loadTasks());
    }, 3000);
  }
}