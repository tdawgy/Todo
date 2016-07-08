import { Task } from './task';

export class UpdateTask {
	constructor(task: Task) {
		this.name = task.task_name;
	}

	name: string;
}