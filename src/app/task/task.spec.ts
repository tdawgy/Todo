import {
  describe, xdescribe,
  expect, it, xit
} from '@angular/core/testing';

import { Task } from './task';

describe('Object: Task', () => {
	describe('constructor', () => {
		it('should construct a new Task', () => {
			//Arrange, Act
			var task = new Task();

			//Assert
			expect(task).toBeTruthy();
		});
	});

	describe('clone', () => {
		it('should create a clone based on the task provided', () => {
			//Arrange
			var task = new Task();
			task.task_id = 123;
			task.task_name = 'task123';
			task.application_id = 'appId123';

			//Act
			var result = Task.Clone(task);

			//Assert
			expect(result.task_id).toBe(task.task_id);
			expect(result.task_name).toBe(task.task_name);
			expect(result.application_id).toBe(task.application_id);
		});
	});
});