import { IsPositive, Length, MaxLength, MinLength } from 'class-validator';
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
  @Length(3, 255)
  title: string;

  @Field()
  @MaxLength(255)
  description: string;

  @Field(() => Float)
  @IsPositive()
  price: number;

  @Field()
  category: string;
}
