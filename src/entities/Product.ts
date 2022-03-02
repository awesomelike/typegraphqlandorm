import { ObjectType, InputType, Field, ID, Float } from 'type-graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;
}
