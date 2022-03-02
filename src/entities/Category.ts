import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
