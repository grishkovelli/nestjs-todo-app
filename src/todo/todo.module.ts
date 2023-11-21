import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoSchema } from './todo.schema';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  providers: [TodoService, TodoResolver],
  controllers: [TodoController],
})
export class TodoModule {}
