export class Task {

	task_id: number;
	task_name: string;
	application_id: string;

	static Clone(task: Task) {
		var clone = new Task();
		clone.task_id = task.task_id;
		clone.task_name = task.task_name;
		clone.application_id = task.application_id;

		return clone;
	}
}