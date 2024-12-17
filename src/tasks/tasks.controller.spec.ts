import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: typeof mockTasksService;

  const mockTasksService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = mockTasksService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', async () => {
    const mockTasks = [{ id: '1', title: 'Task 1' }];
    service.findAll.mockResolvedValue(mockTasks);

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTasks);
  });

  it('should return a single task by ID', async () => {
    const mockTask = { id: '1', title: 'Task 1' };
    service.findOne.mockResolvedValue(mockTask);

    const result = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockTask);
  });

  it('should create a new task', async () => {
    const mockTaskData = { title: 'New Task', description: 'Task description' };
    const mockCreatedTask = { id: '1', ...mockTaskData };

    service.create.mockResolvedValue(mockCreatedTask);

    const result = await controller.create(mockTaskData);

    expect(service.create).toHaveBeenCalledWith(mockTaskData);
    expect(result).toEqual(mockCreatedTask);
  });

  it('should update a task', async () => {
    const mockTask = { id: '1', title: 'Updated Task' };
    service.update.mockResolvedValue(mockTask);

    const result = await controller.update('1', { title: 'Updated Task' });

    expect(service.update).toHaveBeenCalledWith('1', { title: 'Updated Task' });
    expect(result).toEqual(mockTask);
  });

  it('should delete a task', async () => {
    const mockDeleteResult = { affected: 1 };
    service.delete.mockResolvedValue(mockDeleteResult);

    const result = await controller.delete('1');

    expect(service.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockDeleteResult);
  });
});
