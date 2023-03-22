export interface TaskModel {
  id: string;
  projectId: string;
  title: string;
  description: string;
  state: string;
  dateTime: string;
  createdBy: string;
}

export interface CreateTask {
  title: string;
  description: string;
  state: string;
}
