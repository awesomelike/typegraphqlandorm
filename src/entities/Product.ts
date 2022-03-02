import { ObjectType, InputType, Field, ID, Float } from 'type-graphql';
import { Category } from './Category';

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

  @Field(() => Category, { nullable: true })
  category: string;
}

@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  category: string;
}
