import { InputType, Field } from '@nestjs/graphql';

import { SafeSearch } from '../../common/graphql/scalars';

@InputType()
export class TodoSearchInput {
  @Field(() => SafeSearch, { nullable: true })
  readonly textStartWith: string;

  @Field(() => SafeSearch, { nullable: true })
  readonly text: string;
}
