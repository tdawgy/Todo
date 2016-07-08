import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { MdInput, MdHint } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';

import { TaskService } from '../task-service/task.service';
import { Task } from '../task/task';

@Component({
  moduleId: module.id,
  selector: 'task-form',
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.css'],
  directives: [MdInput, MdButton, MdHint]
})
export class TaskFormComponent {
  constructor(taskService: TaskService){
    this._taskService = taskService;
    this._taskService.openedTask;
  }

  private _taskService: TaskService;

  get task() {
    return this._taskService.openedTask;
  };

  save() {
    this._taskService.saveTask();
    this._taskService.isFormVisible = false;
  }

  cancel() {
    this._taskService.openedTask = new Task();
    this._taskService.isFormVisible = false;
  }
}
