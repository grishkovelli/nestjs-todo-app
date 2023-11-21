import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class TodoType {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly completed: boolean;

  @Field(() => GraphQLISODateTime)
  readonly createdAt: string;

  @Field(() => GraphQLISODateTime)
  readonly updatedAt: string;
}
