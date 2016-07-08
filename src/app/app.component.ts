import { Component } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MdToolbar } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';

import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task-service/task.service';
import { Task } from './task/task';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdToolbar, //MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES,
		TaskFormComponent, TaskListComponent],
	providers: [TaskService]
})
export class AppComponent {
	constructor(taskService: TaskService) {
		this._taskService = taskService;
	}

	private _taskService: TaskService;

	get isFormVisible() {
		return this._taskService.isFormVisible;
	}

	openTask(task: Task) {
		if(!task) {
			task = new Task();
		}
		this._taskService.openTask(task);
	}

	showForm() {
		this._taskService.isFormVisible = true;
	}

	hideForm() {
		this._taskService.isFormVisible = false;
	}
}
