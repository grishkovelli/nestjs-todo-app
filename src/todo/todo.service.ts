import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './todo.interface';
import { TodoArgs } from './types';
import { textSearchPattern } from '../utils';
import { CreateTodoDTO } from './dto/create-todo.dto';

class SearchConditionService {
  private filtersMap: { [key: string]: any } = {
    name: (value: [string, string]) => textSearchPattern(...value),
    completed: (value) => value,
  };

  call(args: TodoArgs | undefined = undefined) {
    const condition: {
      name?: RegExp;
      completed?: boolean;
    } = {};

    if (!args?.filter) {
      return condition;
    }

    Object.entries(args.filter).forEach(([field, filters]) => {
      Object.entries(filters).forEach((properties) => {
        condition[field] = this.filtersMap[field](properties);
      });
    });

    return condition;
  }
}

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async getAll(args: TodoArgs | undefined = undefined): Promise<Todo[]> {
    const condition = new SearchConditionService().call(args);

    return this.todoModel.find(condition).exec();
  }

  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    try {
      return await this.todoModel.create(createTodoDTO);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async updateTodo(id: string, updateTodoDTO: CreateTodoDTO) {
    try {
      return await this.todoModel.findByIdAndUpdate(id, updateTodoDTO, {
        new: true,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async deleteTodo(id: string): Promise<any> {
    try {
      return await this.todoModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
