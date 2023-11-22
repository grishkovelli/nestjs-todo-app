import { InputType, Field } from '@nestjs/graphql';

import { SearchFilterInput } from '../../common/graphql/types';

@InputType()
export class TodoFiltersInput {
  @Field(() => SearchFilterInput, { nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly completed: boolean;
}
