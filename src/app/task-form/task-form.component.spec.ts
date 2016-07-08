/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { Task } from '../task/task';

var mockTaskService: any;
var wasSaveTaskCalled: boolean;
var task: Task;

describe('Component: TaskForm', () => {
  beforeEach(() => {
    
    wasSaveTaskCalled = false;
    task = {task_id: 1, task_name: 'name1', application_id: 'appId1'};

    mockTaskService = {
      saveTask: () => {wasSaveTaskCalled = true;},
      openedTask: task,
      isFormVisible: false
    }
  });

  describe('constructor', () => {
    it('should create an instance', () => {
      //Arrange, Act
      let taskForm = new TaskFormComponent(mockTaskService);

      //Assert
      expect(taskForm).toBeTruthy();
      expect(wasSaveTaskCalled).toBeFalsy();
      expect(taskForm.task.task_name).toBe('name1');
      expect(taskForm.task.task_id).toBe(1);
      expect(taskForm.task.application_id).toBe('appId1');
    });
  });
  
  describe('save', () =>{
    it('should call through to the taskServices saveTask method', () => {
      //Arrange
      let taskForm = new TaskFormComponent(mockTaskService);
      mockTaskService.isFormVisible = true;

      //Act
      taskForm.save();

      //Assert
      expect(wasSaveTaskCalled).toBeTruthy();
      expect(mockTaskService.isFormVisible).toBeFalsy();
    });
  });

  describe('cancel', () =>{
    it('should NOT call through to the taskServices saveTask method and should reset the openedTask', () => {
      //Arrange
      let taskForm = new TaskFormComponent(mockTaskService);
      mockTaskService.isFormVisible = true;

      //Act
      taskForm.cancel();

      //Assert
      expect(wasSaveTaskCalled).toBeFalsy();
      expect(mockTaskService.isFormVisible).toBeFalsy();
    });
  });
});
