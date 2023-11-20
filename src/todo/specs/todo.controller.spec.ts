import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from '../todo.controller';
import { TodoService } from '../todo.service';
import { CreateTodoDTO } from '../dto/create-todo.dto';

describe('TodoController', () => {
  const dto: CreateTodoDTO = {
    name: 'New todo list'
  };

  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    })
      .overrideProvider(TodoService)
      .useValue({
        getAll: jest.fn(),
        addTodo: jest.fn(),
        updateTodo: jest.fn(),
        deleteTodo: jest.fn(),
      })
      .compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('returns ...', async () => {
      jest.spyOn(service, 'getAll');

      await controller.getAll();
      expect(service.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('addTodo', () => {
    it('returns ...', async () => {
      jest.spyOn(service, 'addTodo');

      await controller.addTodo(dto);
      expect(service.addTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('returns ...', async () => {
      jest.spyOn(service, 'updateTodo');

      await controller.updateTodo('id-of-the-record', dto);
      expect(service.updateTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo', () => {
    it('returns ...', async () => {
      jest.spyOn(service, 'deleteTodo');

      await controller.deleteTodo('id-of-the-record');
      expect(service.deleteTodo).toHaveBeenCalledTimes(1);
    });
  });
});
