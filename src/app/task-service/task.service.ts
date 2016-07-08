import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS, Response } from '@angular/http';

import { Task } from '../task/task';
import { CreateTask } from '../task/create-task';
import { UpdateTask } from '../task/update-task';

@Injectable()
export class TaskService {
  constructor(http: Http) {
    this._http = http;
    this._apiUrl = 'http://homework.avantlink.com/tasks';
    this._apiUrlWithParameter = this._apiUrl + '?id=';
    
    this.openedTask = new Task();
    this._getTasks();
    this.isFormVisible = false;
  }

  private _http: Http;
  private _tasks: Task[];
  private _apiUrl: string;
  private _apiUrlWithParameter: string;

  openedTask: Task;
  isFormVisible: boolean;

  get tasks() {
    return this._tasks;
  }

  openTask(task: Task) {
    this.openedTask = Task.Clone(task);
    this.isFormVisible = true;
  }

  saveTask() {
    if(this.openedTask.task_id) {
      this._updateTask();
    } else {
      this._createTask();
    }
  }

  deleteTask(task: Task) {
    this._deleteTask(task.task_id);
  }

  private _getTasks() {
    this._http.get(this._apiUrl)
      .subscribe((getTasksResponse:Response) => {
        this._tasks = getTasksResponse.json().data
      });
  }

  private _createTask() {
    var createTask = new CreateTask(this.openedTask);

    this._http.post(this._apiUrl, createTask)
      .subscribe((createTaskResponse:Response) => {
        this.isFormVisible = false;
        this._tasks.push(createTaskResponse.json().data);
        this.openedTask = new Task();
      });
  }

  private _updateTask() {
    var updateTask = new UpdateTask(this.openedTask);

    this._http.put(this._apiUrlWithParameter + this.openedTask.task_id, updateTask)
      .subscribe((updateTaskResponse:Response) => {
        this.isFormVisible = false;

        var updatedTask = updateTaskResponse.json().data;
        this._tasks = this._tasks.filter((task: Task) => {
          return task.task_id !== updatedTask.task_id;
        });

        this._tasks.push(updatedTask);        
        this.openedTask = new Task();
      });
  }

  private _deleteTask(id: number) {
    this._http.delete(this._apiUrlWithParameter + id)
      .subscribe((deleteTaskResponse:Response) => {
        this._tasks = this._tasks.filter((value) => {
          return value.task_id !== id;
        });
      });
  }
}