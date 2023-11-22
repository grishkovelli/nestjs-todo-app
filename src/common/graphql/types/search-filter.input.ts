import { InputType, Field } from '@nestjs/graphql';

import { SafeSearch } from '../scalars';

@InputType()
export class SearchFilterInput {
  @Field(() => SafeSearch, { nullable: true })
  readonly textStartWith: string;

  @Field(() => SafeSearch, { nullable: true })
  readonly text: string;
}
