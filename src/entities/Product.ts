import { IsPositive, Length, MaxLength } from 'class-validator';
import { ObjectType, InputType, Field, ID, Float } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

@Entity('products')
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 255 })
  @Field()
  title: string;

  @Column({ length: 255 })
  @Field()
  description: string;

  @Column({ type: 'float' })
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Category, { nullable: true })
  category: number;
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
  category: number;
}
