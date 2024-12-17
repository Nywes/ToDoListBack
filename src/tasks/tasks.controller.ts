import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

// Permet de s'assurer que lorsqu'une tâche est crée elle comporte bien un titre qui soit un string, idem pour la description
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.delete(id);
  }
}
