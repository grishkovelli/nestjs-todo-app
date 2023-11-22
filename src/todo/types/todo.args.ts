import { ArgsType, Field } from '@nestjs/graphql';

import { TodoFiltersInput } from './todo.filters.input';

@ArgsType()
export class TodoArgs {
  @Field({ nullable: true })
  readonly filter: TodoFiltersInput;
}
