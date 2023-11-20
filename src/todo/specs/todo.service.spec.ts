import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TodoDoc } from '../todo.schema';
import { todoInput } from '../../fixtures';
import { TodoService } from '../todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<TodoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<TodoDoc>>(getModelToken('Todo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('calls todoModel.find', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn(),
      } as any);

      await service.getAll();
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('addTodo', () => {
    it('calls todoModel.create', async () => {
      jest.spyOn(model, 'create');

      await service.addTodo(todoInput);
      expect(model.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTodo', () => {
    it('calls todoModel.findByIdAndUpdate', async () => {
      jest.spyOn(model, 'findByIdAndUpdate');

      await service.updateTodo('if of the record', todoInput);
      expect(model.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTodo', () => {
    it('calls todoModel.findByIdAndDelete', async () => {
      jest.spyOn(model, 'findByIdAndDelete');

      await service.deleteTodo('if of the record');
      expect(model.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });
});
