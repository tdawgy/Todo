/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';

import { TaskService } from './task.service';
import { Task } from '../task/task';

var mockBackend: MockBackend;
var responseBody: Task[];
var responseOptions: ResponseOptions;
var response: Response;

describe('Service: TaskService', () => {
  beforeEachProviders(() => [
    TaskService,
    MockBackend,
    BaseRequestOptions,
    provide(Http, 
      {
        useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions] 
      })
    ]);
  
  beforeEach(inject([MockBackend], (_mockBackend) => {
    mockBackend = _mockBackend;
    responseBody = [{task_id: 1, task_name: 'test1', application_id: '123'}, {task_id: 2, task_name: 'test2', application_id: '123'}];
    responseOptions = new ResponseOptions({body: JSON.stringify(responseBody)});
    response = new Response(responseOptions);

    mockBackend.connections.subscribe(connection => {
        connection.mockRespond(response);
      });
  }));

describe('constructor', () => {
    it('should inject service making initial get request', () => {
      //Arrange, Act
      inject([Http], (http: Http) => {
        var taskService = new taskService(http);
        
        //Assert
        expect(taskService).toBeTruthy();
        expect(taskService.openedTask).toBeTruthy();
        expect(taskService.tasks.length).toBe(2);
      });
    });
  });

  describe('openTask', () => {
    it('should set the opened task to the one provided', () => {
      inject([TaskService], (taskService: TaskService) => {
        //Arrange, Act
        taskService.openTask(taskService.tasks[1]);
        
        //Assert
        expect(taskService.openedTask).toBe(taskService.tasks[1]);
      });
    });
  });

  describe('saveTask', () => {
    it('should make a put request with the openedTask and update the task with the response', () => {
      inject([TaskService], (taskService: TaskService) => {
        //Arrange
        var savedTask = {id: 3, name: 'test3', application_id: '1234'};
        var saveResponseOptions = new ResponseOptions({body: savedTask});
        var saveResponse = new Response(saveResponseOptions);

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(saveResponse);
        });

        taskService.openTask(taskService.tasks[1]);
                
        //Act
        taskService.saveTask();
        
        //Assert
        expect(taskService.openedTask.task_name).toBeEmpty();
        expect(taskService.tasks.length).toBe(2);
        expect(taskService.tasks[1].task_id).toBe(4);
      });
    });
  });
});
