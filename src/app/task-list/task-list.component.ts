import { Component } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { TaskService } from '../task-service/task.service';
import { Task } from '../task/task';

@Component({
  moduleId: module.id,
  selector: 'task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
  directives: [MD_CARD_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry]
})
export class TaskListComponent {
  constructor(taskService: TaskService) {
    this._taskService = taskService;
  }

  private _taskService: TaskService;

  get tasks() {
    return this._taskService.tasks;
  }

  open(task: Task) {
    this._taskService.openTask(task);
  }

  delete(task: Task) {
    this._taskService.deleteTask(task);
  }
}