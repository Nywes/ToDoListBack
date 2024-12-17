import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repository: typeof mockTasksRepository;

  const mockTasksRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = mockTasksRepository;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tasks', async () => {
    const mockTasks = [{ id: '1', title: 'Task 1' }];
    repository.find.mockResolvedValue(mockTasks);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTasks);
  });

  it('should return a single task by ID', async () => {
    const mockTask = { id: '1', title: 'Task 1' };
    repository.findOneBy.mockResolvedValue(mockTask);

    const result = await service.findOne('1');

    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(mockTask);
  });

  it('should create a new task', async () => {
    const mockTaskData = { title: 'New Task' };
    const mockSavedTask = { id: '1', ...mockTaskData };

    repository.create.mockReturnValue(mockTaskData);
    repository.save.mockResolvedValue(mockSavedTask);

    const result = await service.create(mockTaskData);

    expect(repository.create).toHaveBeenCalledWith(mockTaskData);
    expect(repository.save).toHaveBeenCalledWith(mockTaskData);
    expect(result).toEqual(mockSavedTask);
  });

  it('should update a task', async () => {
    const mockTask = { id: '1', title: 'Updated Task' };

    repository.update.mockResolvedValue({ affected: 1 });
    repository.findOneBy.mockResolvedValue(mockTask);

    const result = await service.update('1', { title: 'Updated Task' });

    expect(repository.update).toHaveBeenCalledWith('1', {
      title: 'Updated Task',
    });
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(mockTask);
  });

  it('should delete a task', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.delete('1');

    expect(repository.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual({ affected: 1 });
  });
});
