import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: string) {
    return this.tasksRepository.findOneBy({ id });
  }

  create(task: Partial<Task>) {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async update(id: string, updateData: Partial<Task>) {
    await this.tasksRepository.update(id, updateData);
    return this.tasksRepository.findOneBy({ id });
  }

  delete(id: string) {
    return this.tasksRepository.delete(id);
  }
}
