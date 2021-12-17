import { TaskRepository } from './tasks.repository';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRespository: TaskRepository,
  ) {}
  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }
  //   getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     return tasks;
  //   }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRespository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRespository.createTask(createTaskDto);
  }

  //   createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //     return task;
  //   }
  //   updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //     const { status } = updateTaskStatusDto;
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }
  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRespository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
