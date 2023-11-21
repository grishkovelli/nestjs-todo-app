import { ArgsType, Field } from '@nestjs/graphql';

import { TodoSearchInput } from './todo.search.input';

@ArgsType()
export class TodoArgs {
  @Field({ nullable: true })
  readonly filter: TodoSearchInput;
}
