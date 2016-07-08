import { Task } from './task'

export class CreateTask {
	constructor(task: Task) {
		this.name = task.task_name;
	}
	
	name: string;
}