import { Args, Query, Resolver } from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { TodoType, TodoArgs } from './types';
import { Todo } from './todo.interface';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoType], { nullable: true })
  async todos(@Args() args: TodoArgs): Promise<Todo[]> {
    return await this.todoService.getAll(args);
  }
}
