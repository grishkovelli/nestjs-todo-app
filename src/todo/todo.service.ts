import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';
interface GetAllArgs {
  filter: {
    textStartWith?: string;
    text?: string;
  };
}

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async getAll(args: GetAllArgs = { filter: {} }): Promise<Todo[]> {
    const condition: { name?: RegExp } = {};
    const {
      filter: { text, textStartWith },
    } = args;

    if (textStartWith) {
      condition.name = new RegExp(`^${textStartWith}`, 'i');
    }

    if (text) {
      condition.name = new RegExp(`${args.filter.text}`, 'i');
    }

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
