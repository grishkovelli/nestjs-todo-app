import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './todo.interface';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Post()
  addTodo(@Body() createTodoDTO: CreateTodoDTO) {
    return this.todoService.addTodo(createTodoDTO);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id,
    @Body() updateTodoDTO: CreateTodoDTO,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, updateTodoDTO);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
