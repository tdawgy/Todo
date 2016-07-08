/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Task } from '../task/task';

var mockTaskService;
var openTaskCalled: boolean;
var deleteTaskCalled: boolean;
var task1: Task;
var task2: Task;

describe('Component: TaskList', () => {
  beforeEach(() => {
    openTaskCalled = false;
    deleteTaskCalled = false;
    task1 = {task_name: 'name1', task_id: 1, application_id: 'appId1'};
    task2 = {task_name: 'name2', task_id: 2, application_id: 'appId2'};

    mockTaskService = {
      tasks: [task1, task2],
      openTask: () => {openTaskCalled = true},
      deleteTask: () => {deleteTaskCalled = true}
    };
  });

  describe('constructor', () => {
    it('should create an instance', () => {
        //Arrange, Act
        let taskList = new TaskListComponent(mockTaskService);

        //Assert
        expect(taskList).toBeTruthy();
        expect(taskList.tasks.length).toBe(2);
        expect(openTaskCalled).toBeFalsy();
        expect(deleteTaskCalled).toBeFalsy();
    });
  });

  describe('open', () => {
    it('should call taskService.openTask and emit showForm', () => {
      //Arrange
      let taskList = new TaskListComponent(mockTaskService);

      //Act
      taskList.open(task1);

      //Assert
      expect(openTaskCalled).toBeTruthy();
      expect(deleteTaskCalled).toBeFalsy();
    });
  });

  describe('delete', () => {
    it('should call taskService.deleteTask', () => {
      //Arrange
      let taskList = new TaskListComponent(mockTaskService);
      
      //Act
      taskList.delete(task1);

      //Assert
      expect(deleteTaskCalled).toBeTruthy();
      expect(openTaskCalled).toBeFalsy();
    });
  });
});