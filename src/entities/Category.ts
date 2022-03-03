import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
}
