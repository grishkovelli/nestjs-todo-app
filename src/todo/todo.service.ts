import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Todo } from './todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async getAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    return this.todoModel.create(createTodoDTO);
  }

  async updateTodo(id: string, updateTodoDTO: CreateTodoDTO) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDTO, { new: true });
  }

  async deleteTodo(id: string): Promise<any> {
    return await this.todoModel.findByIdAndDelete(id);
  }
}
