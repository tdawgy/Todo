/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { provide } from '@angular/core';

import { AppComponent } from './app.component';
import { Task } from './task/task';
import { TaskService } from './task-service/task.service';

var mockTaskService;
var openWasCalledWith;

beforeEachProviders(() => [AppComponent, 
  provide(TaskService, 
    {
      useFactory: () => mockTaskService
    }
  )
]);

describe('Component: App', () => {
  openWasCalledWith = null;

  beforeEach(() => {
    mockTaskService = {
      isFormVisible: false,
      openTask: (task: Task) => {
        openWasCalledWith = task;
      }
    }
  });

  describe('constructor', () => {
    it('should create the app', inject([AppComponent], (app: AppComponent) => {
      //Arrange, Act, Assert
      expect(app).toBeTruthy();
    }));
  });

  describe('openTask', () => {
    it('should set isFormVisible to true and call taskService.openTask', inject([AppComponent], (app: AppComponent) => {
      //Arrange
      var task = new Task();
      task.task_id = 123;
      
      //Act
      app.openTask(task);

      //Assert
      expect(openWasCalledWith).toBe(task);
    }));

    it('should set provide a newly constructed task when no task is provided', inject([AppComponent], (app: AppComponent) => {
      //Arrange, Act
      app.openTask(null);

      //Assert
      expect(openWasCalledWith).not.toBeNull();
    }));
  });

  describe('showForm', () => {
    it('should set isFormVisible to true', inject([AppComponent], (app: AppComponent) => {
      //Arrange, Act
      app.showForm();

      //Assert
      expect(app.isFormVisible).toBeTruthy();
    }));
  });

  describe('hideForm', () => {
    it('should set isFormVisible to false', inject([AppComponent], (app: AppComponent) => {
      //Arrange, Act
      app.hideForm();

      //Assert
      expect(app.isFormVisible).toBeFalsy();
    }));
  });
});
